import React, { useEffect, useRef, useState } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

interface SynapticPulse {
  startIdx: number;
  endIdx: number;
  progress: number;
  speed: number;
}

export const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    motionQuery.addEventListener('change', handleMotionChange);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNodes();
    };

    window.addEventListener('resize', handleResize);

    // Node network generation
    let nodes: Node[] = [];
    const MAX_DISTANCE = 160;
    const MAX_NODES = Math.min(Math.floor((width * height) / 22000), 55);

    function initNodes() {
      nodes = [];
      const count = Math.max(Math.min(Math.floor((width * height) / 22000), 55), 25);
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          radius: Math.random() * 1.5 + 1.2,
          baseAlpha: Math.random() * 0.25 + 0.15,
          pulseSpeed: Math.random() * 0.02 + 0.008,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    }

    initNodes();

    // Occasional synaptic signals traversing connections
    let pulses: SynapticPulse[] = [];

    function spawnPulse() {
      if (nodes.length < 2) return;
      const startIdx = Math.floor(Math.random() * nodes.length);
      // Find a close neighbor
      const neighbors: number[] = [];
      for (let j = 0; j < nodes.length; j++) {
        if (j === startIdx) continue;
        const dx = nodes[startIdx].x - nodes[j].x;
        const dy = nodes[startIdx].y - nodes[j].y;
        if (Math.hypot(dx, dy) < MAX_DISTANCE) {
          neighbors.push(j);
        }
      }

      if (neighbors.length > 0) {
        const endIdx = neighbors[Math.floor(Math.random() * neighbors.length)];
        pulses.push({
          startIdx,
          endIdx,
          progress: 0,
          speed: Math.random() * 0.012 + 0.008,
        });
      }
    }

    const pulseInterval = setInterval(() => {
      if (pulses.length < 6 && !reducedMotion) {
        spawnPulse();
      }
    }, 1800);

    // Main render loop
    let tick = 0;
    function render() {
      if (!ctx) return;
      tick++;
      ctx.clearRect(0, 0, width, height);

      // 1. Update and draw connections
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];

        if (!reducedMotion) {
          nodeA.x += nodeA.vx;
          nodeA.y += nodeA.vy;

          // Bounce smoothly on borders
          if (nodeA.x < -20) nodeA.x = width + 20;
          if (nodeA.x > width + 20) nodeA.x = -20;
          if (nodeA.y < -20) nodeA.y = height + 20;
          if (nodeA.y > height + 20) nodeA.y = -20;

          nodeA.pulsePhase += nodeA.pulseSpeed;
        }

        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dist = Math.hypot(dx, dy);

          if (dist < MAX_DISTANCE) {
            const proximityFactor = 1 - dist / MAX_DISTANCE;
            // Extremely subtle line opacity to prevent visual clutter
            const lineOpacity = proximityFactor * 0.14;

            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${lineOpacity})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // 2. Render traversing synaptic signals
      if (!reducedMotion) {
        for (let p = pulses.length - 1; p >= 0; p--) {
          const pulse = pulses[p];
          pulse.progress += pulse.speed;

          if (pulse.progress >= 1) {
            pulses.splice(p, 1);
            continue;
          }

          const startNode = nodes[pulse.startIdx];
          const endNode = nodes[pulse.endIdx];

          if (startNode && endNode) {
            const curX = startNode.x + (endNode.x - startNode.x) * pulse.progress;
            const curY = startNode.y + (endNode.y - startNode.y) * pulse.progress;

            // Signal head
            ctx.beginPath();
            ctx.arc(curX, curY, 1.8, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(103, 232, 249, 0.65)';
            ctx.shadowColor = 'rgba(6, 182, 212, 0.8)';
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.shadowBlur = 0; // reset
          }
        }
      }

      // 3. Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const pulseAlpha =
          node.baseAlpha + Math.sin(node.pulsePhase) * 0.08;

        // Node glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${Math.max(0.08, pulseAlpha)})`;
        ctx.fill();

        // Node core
        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(0.6, node.radius * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224, 242, 254, ${Math.max(0.25, pulseAlpha + 0.2)})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(pulseInterval);
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, [reducedMotion]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. Deep Navy to Dark Charcoal Base Gradient Canvas */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 90% 70% at 50% 10%, #0A1626 0%, #07111C 45%, #05080D 100%)',
        }}
      />

      {/* 2. Soft Ambient Cyan/Blue Illuminations for Technical Atmosphere */}
      <div 
        className="absolute top-[-10%] right-[10%] w-[650px] h-[650px] rounded-full blur-[140px] opacity-[0.14] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #06b6d4 0%, #0369a1 50%, transparent 75%)' }}
      />
      <div 
        className="absolute bottom-[5%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[130px] opacity-[0.09] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0284c7 0%, #0f172a 60%, transparent 80%)' }}
      />

      {/* 3. HTML5 Canvas for Animated Interconnected Neural Network & Synaptic Signals */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-85"
      />

      {/* 4. Atmospheric Technical Edge Visualization Elements */}
      {/* Top Left: System telemetry badge */}
      <div className="hidden xl:flex absolute top-6 left-8 items-center gap-3 font-mono text-[9px] text-cyan-500/25 tracking-widest">
        <div className="flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-cyan-400/40 animate-pulse" />
          <span>NN_CORE // ACTIVE</span>
        </div>
        <span>[TENSOR_SYNAPSE: 0x98A]</span>
      </div>

      {/* Top Right: Signal Stream Indicator */}
      <div className="hidden xl:flex absolute top-6 right-8 items-center gap-2 font-mono text-[9px] text-cyan-500/20 tracking-widest">
        <span>LATENCY_CLOCK: 14MS</span>
        <div className="flex items-end gap-0.5 h-2.5">
          <span className="w-0.5 h-1.5 bg-cyan-400/30" />
          <span className="w-0.5 h-2.5 bg-cyan-400/40" />
          <span className="w-0.5 h-2 bg-cyan-400/30" />
          <span className="w-0.5 h-1 bg-cyan-400/20" />
        </div>
      </div>

      {/* Bottom Left: Micro Sparkline & Graph Line */}
      <div className="hidden 2xl:flex absolute bottom-8 left-8 flex-col gap-1 font-mono text-[9px] text-cyan-500/20">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-0.5 bg-cyan-400/30" />
          <span>INFERENCE_FEED // STABLE</span>
        </div>
        <svg width="72" height="12" className="opacity-40">
          <polyline
            fill="none"
            stroke="#06b6d4"
            strokeWidth="0.75"
            points="0,8 14,8 22,3 32,9 44,4 58,7 72,5"
          />
        </svg>
      </div>

      {/* Bottom Right: Minimal Network Coordinates */}
      <div className="hidden 2xl:flex absolute bottom-8 right-8 font-mono text-[9px] text-cyan-500/20 tracking-wider">
        <span>LOC // 23.7957° N, 86.4304° E</span>
      </div>
    </div>
  );
};
