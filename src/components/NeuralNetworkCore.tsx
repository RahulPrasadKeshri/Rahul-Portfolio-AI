import React, { useEffect, useRef, useState } from 'react';

interface Node3D {
  x: number;
  y: number;
  z: number;
  radius: number;
  baseAlpha: number;
  layer: 'core' | 'mid' | 'outer' | 'dendrite';
  isHub?: boolean;
  pulsePhase: number;
  pulseSpeed: number;
  category: string;
  domain: string;
}

interface Connection3D {
  from: number;
  to: number;
  dist: number;
  baseAlpha: number;
  isDendrite?: boolean;
}

interface Signal3D {
  from: number;
  to: number;
  progress: number;
  speed: number;
  color: string;
}

const CATEGORIES: { category: string; domain: string }[] = [
  { category: 'GENAI', domain: 'AI ENGINEERING' },
  { category: 'BACKEND', domain: 'FASTAPI & NODE' },
  { category: 'FRONTEND', domain: 'REACT & TYPESCRIPT' },
  { category: 'API', domain: 'REST CONTRACTS' },
  { category: 'DATABASE', domain: 'FIRESTORE & SQL' },
  { category: 'AI', domain: 'RAG ARCHITECTURE' },
  { category: 'SYSTEMS', domain: 'FULL-STACK ARCHITECTURE' },
  { category: 'PROJECTS', domain: 'VERIFIED DEPLOYMENTS' },
];

export const NeuralNetworkCore: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isHoveringCore, setIsHoveringCore] = useState(false);
  const [nodesCount, setNodesCount] = useState(146);
  const [connectionsCount, setConnectionsCount] = useState(294);
  const [hoveredNodeInfo, setHoveredNodeInfo] = useState<{
    category: string;
    domain: string;
    x: number;
    y: number;
  } | null>(null);

  const mousePosRef = useRef<{ x: number; y: number; isInside: boolean }>({
    x: -999,
    y: -999,
    isInside: false,
  });

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isReduced = motionQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReduced = e.matches;
    };
    motionQuery.addEventListener('change', handleMotionChange);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // HiDPI canvas configuration for crisp node rendering
    const displaySize = 520;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = displaySize * dpr;
    canvas.height = displaySize * dpr;
    ctx.scale(dpr, dpr);

    const centerX = displaySize / 2;
    const centerY = displaySize / 2;

    const R_OUTER = 165;
    const R_MID = 115;
    const R_CORE = 60;

    const nodes: Node3D[] = [];
    const connections: Connection3D[] = [];
    const signals: Signal3D[] = [];

    // 1. Generate Outer Shell Nodes using Fibonacci Sphere
    const N_OUTER = 68;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    for (let i = 0; i < N_OUTER; i++) {
      const y = 1 - (i / (N_OUTER - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const jitter = (Math.random() - 0.5) * 12;
      const r = R_OUTER + jitter;
      const cat = CATEGORIES[i % CATEGORIES.length];

      nodes.push({
        x: Math.cos(theta) * radiusAtY * r,
        y: y * r,
        z: Math.sin(theta) * radiusAtY * r,
        radius: Math.random() > 0.85 ? 2.6 : 1.6,
        baseAlpha: Math.random() * 0.4 + 0.45,
        layer: 'outer',
        isHub: Math.random() > 0.88,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        category: cat.category,
        domain: cat.domain,
      });
    }

    // 2. Generate Mid-Layer Synaptic Nodes
    const N_MID = 42;
    for (let i = 0; i < N_MID; i++) {
      const y = 1 - (i / (N_MID - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * (i + 13);
      const r = R_MID + (Math.random() - 0.5) * 14;
      const cat = CATEGORIES[(i + 3) % CATEGORIES.length];

      nodes.push({
        x: Math.cos(theta) * radiusAtY * r,
        y: y * r,
        z: Math.sin(theta) * radiusAtY * r,
        radius: Math.random() > 0.8 ? 2.4 : 1.4,
        baseAlpha: Math.random() * 0.4 + 0.5,
        layer: 'mid',
        isHub: Math.random() > 0.9,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        category: cat.category,
        domain: cat.domain,
      });
    }

    // 3. Generate Inner Core Nodes (Intelligence Kernel)
    const N_CORE = 24;
    for (let i = 0; i < N_CORE; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phiAngle = (Math.random() - 0.5) * Math.PI;
      const r = (Math.random() * 0.8 + 0.2) * R_CORE;
      const cat = CATEGORIES[(i + 5) % CATEGORIES.length];

      nodes.push({
        x: Math.cos(theta) * Math.cos(phiAngle) * r,
        y: Math.sin(phiAngle) * r,
        z: Math.sin(theta) * Math.cos(phiAngle) * r,
        radius: Math.random() > 0.7 ? 3.0 : 1.8,
        baseAlpha: Math.random() * 0.35 + 0.65,
        layer: 'core',
        isHub: true,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.04 + 0.02,
        category: cat.category,
        domain: cat.domain,
      });
    }

    // 4. Background Integration: Outward Dendrite Nodes extending into dark space
    const N_DENDRITES = 12;
    for (let i = 0; i < N_DENDRITES; i++) {
      const theta = (i / N_DENDRITES) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const phiAngle = (Math.random() - 0.5) * 1.2;
      const r = R_OUTER + 55 + Math.random() * 45;
      const cat = CATEGORIES[(i + 1) % CATEGORIES.length];

      nodes.push({
        x: Math.cos(theta) * Math.cos(phiAngle) * r,
        y: Math.sin(phiAngle) * r,
        z: Math.sin(theta) * Math.cos(phiAngle) * r,
        radius: 1.2,
        baseAlpha: 0.35,
        layer: 'dendrite',
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015,
        category: cat.category,
        domain: cat.domain,
      });
    }

    // 5. Establish Neural Connections based on spatial proximity
    const connectMaxDistOuter = 62;
    const connectMaxDistTransverse = 72;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);

        let canConnect = false;
        let baseAlpha = 0.22;

        if (a.layer === 'dendrite' || b.layer === 'dendrite') {
          if (dist < 90 && (a.layer === 'outer' || b.layer === 'outer')) {
            canConnect = true;
            baseAlpha = 0.14;
          }
        } else if (a.layer === 'outer' && b.layer === 'outer') {
          if (dist < connectMaxDistOuter) {
            canConnect = true;
            baseAlpha = 0.24;
          }
        } else if (a.layer === 'mid' && b.layer === 'mid') {
          if (dist < 54) {
            canConnect = true;
            baseAlpha = 0.32;
          }
        } else if (a.layer === 'core' && b.layer === 'core') {
          if (dist < 46) {
            canConnect = true;
            baseAlpha = 0.45;
          }
        } else if (
          (a.layer === 'outer' && b.layer === 'mid') ||
          (a.layer === 'mid' && b.layer === 'outer') ||
          (a.layer === 'mid' && b.layer === 'core') ||
          (a.layer === 'core' && b.layer === 'mid')
        ) {
          if (dist < connectMaxDistTransverse) {
            canConnect = true;
            baseAlpha = 0.18;
          }
        }

        if (canConnect) {
          connections.push({ from: i, to: j, dist, baseAlpha, isDendrite: a.layer === 'dendrite' || b.layer === 'dendrite' });
        }
      }
    }

    setNodesCount(nodes.length);
    setConnectionsCount(connections.length);

    // 6. Active Signal Pulses running across connections
    const signalInterval = setInterval(() => {
      if (connections.length === 0) return;
      if (signals.length >= 18) return;

      const c = connections[Math.floor(Math.random() * connections.length)];
      if (c.isDendrite && Math.random() > 0.3) return;

      const isReverse = Math.random() > 0.5;
      signals.push({
        from: isReverse ? c.to : c.from,
        to: isReverse ? c.from : c.to,
        progress: 0,
        speed: Math.random() * 0.016 + 0.012,
        color: Math.random() > 0.3 ? '#22d3ee' : '#e0f2fe',
      });
    }, 240);

    // Animation & Rotation State
    let animId: number;
    let tick = 0;
    let angleY = 0.4;
    let angleX = 0.28;

    let activeHoverNodeIndex = -1;

    const renderCtx = ctx;

    function render() {
      if (!renderCtx) return;
      renderCtx.clearRect(0, 0, displaySize, displaySize);

      tick++;
      if (!isReduced) {
        angleY += 0.0022; // Slow, majestic rotation
        angleX = 0.24 + Math.sin(tick * 0.0008) * 0.06;
      }

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const cameraDist = 480;

      // Project all 3D nodes to 2D
      const projected = nodes.map((node) => {
        const x1 = node.x * cosY + node.z * sinY;
        const z1 = -node.x * sinY + node.z * cosY;

        const y2 = node.y * cosX - z1 * sinX;
        const z2 = node.y * sinX + z1 * cosX;

        const fov = cameraDist / (cameraDist + z2);
        const px = centerX + x1 * fov;
        const py = centerY + y2 * fov;

        const depthRatio = Math.max(0, Math.min(1, (z2 + R_OUTER + 60) / ((R_OUTER + 60) * 2)));

        return { px, py, pz: z2, depthRatio, fov };
      });

      // Detect closest node to cursor if hovering
      const mouse = mousePosRef.current;
      let closestNodeIdx = -1;
      let minCursorDist = 24; // detection threshold px

      if (mouse.isInside && mouse.x > 0 && mouse.y > 0) {
        for (let i = 0; i < projected.length; i++) {
          const p = projected[i];
          const d = Math.hypot(p.px - mouse.x, p.py - mouse.y);
          if (d < minCursorDist && p.depthRatio > 0.3) {
            minCursorDist = d;
            closestNodeIdx = i;
          }
        }
      }

      activeHoverNodeIndex = closestNodeIdx;

      // 1. Draw Interconnected Neural Lines
      for (let i = 0; i < connections.length; i++) {
        const conn = connections[i];
        const pA = projected[conn.from];
        const pB = projected[conn.to];

        const isAttachedToHovered =
          activeHoverNodeIndex !== -1 &&
          (conn.from === activeHoverNodeIndex || conn.to === activeHoverNodeIndex);

        const avgDepth = (pA.depthRatio + pB.depthRatio) / 2;
        let alpha = Math.max(0.04, conn.baseAlpha * Math.pow(avgDepth, 1.4));

        // When mouse is hovering core, slightly boost brightness
        if (mouse.isInside) {
          alpha = Math.min(1, alpha * 1.3);
        }

        renderCtx.beginPath();
        renderCtx.moveTo(pA.px, pA.py);
        renderCtx.lineTo(pB.px, pB.py);

        if (isAttachedToHovered) {
          // Highlight nearby connections
          renderCtx.strokeStyle = 'rgba(6, 182, 212, 0.85)';
          renderCtx.lineWidth = 1.8;
        } else if (conn.isDendrite) {
          const grad = renderCtx.createLinearGradient(pA.px, pA.py, pB.px, pB.py);
          grad.addColorStop(0, `rgba(6, 182, 212, ${alpha})`);
          grad.addColorStop(1, 'rgba(6, 182, 212, 0)');
          renderCtx.strokeStyle = grad;
          renderCtx.lineWidth = 0.6;
        } else {
          renderCtx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
          renderCtx.lineWidth = Math.max(0.5, 0.8 * avgDepth);
        }

        renderCtx.stroke();
      }

      // 2. Draw Synaptic Signals
      if (!isReduced) {
        for (let s = signals.length - 1; s >= 0; s--) {
          const sig = signals[s];
          sig.progress += sig.speed;

          if (sig.progress >= 1) {
            signals.splice(s, 1);
            continue;
          }

          const pA = projected[sig.from];
          const pB = projected[sig.to];

          if (pA && pB) {
            const sx = pA.px + (pB.px - pA.px) * sig.progress;
            const sy = pA.py + (pB.py - pA.py) * sig.progress;
            const depth = pA.depthRatio + (pB.depthRatio - pA.depthRatio) * sig.progress;

            renderCtx.beginPath();
            renderCtx.arc(sx, sy, Math.max(1.2, 2.0 * depth), 0, Math.PI * 2);
            renderCtx.fillStyle = sig.color;
            renderCtx.shadowColor = 'rgba(34, 211, 238, 0.9)';
            renderCtx.shadowBlur = 8;
            renderCtx.fill();
            renderCtx.shadowBlur = 0;
          }
        }
      }

      // 3. Draw Nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const p = projected[i];

        const isHovered = activeHoverNodeIndex === i;
        const isNeighbor =
          activeHoverNodeIndex !== -1 &&
          connections.some(
            (conn) =>
              (conn.from === activeHoverNodeIndex && conn.to === i) ||
              (conn.to === activeHoverNodeIndex && conn.from === i)
          );

        let pulse = Math.sin(node.pulsePhase + tick * node.pulseSpeed) * 0.15;
        if (isHovered || isNeighbor) {
          pulse = Math.sin(tick * 0.1) * 0.35 + 0.2;
        }

        let alpha = Math.max(0.12, Math.min(1, (node.baseAlpha + pulse) * Math.pow(p.depthRatio, 1.2)));

        // Boost brightness on hover
        if (mouse.isInside) {
          alpha = Math.min(1, alpha * 1.35);
        }

        let r = Math.max(0.8, node.radius * p.depthRatio * (node.isHub ? 1.25 : 1.0));
        if (isHovered) {
          r *= 1.7;
          alpha = 1;
        } else if (isNeighbor) {
          r *= 1.3;
          alpha = Math.min(1, alpha * 1.4);
        }

        // Glow ring around hovered or hub nodes
        if (isHovered) {
          renderCtx.beginPath();
          renderCtx.arc(p.px, p.py, r * 2.8, 0, Math.PI * 2);
          renderCtx.fillStyle = 'rgba(6, 182, 212, 0.4)';
          renderCtx.fill();
        } else if (node.isHub && p.depthRatio > 0.45) {
          renderCtx.beginPath();
          renderCtx.arc(p.px, p.py, r * 2.6, 0, Math.PI * 2);
          renderCtx.fillStyle = `rgba(6, 182, 212, ${alpha * 0.25})`;
          renderCtx.fill();
        }

        // Node core circle
        renderCtx.beginPath();
        renderCtx.arc(p.px, p.py, r, 0, Math.PI * 2);

        if (isHovered) {
          renderCtx.fillStyle = '#ffffff';
        } else if (node.isHub || p.depthRatio > 0.8) {
          renderCtx.fillStyle = `rgba(240, 249, 255, ${alpha})`;
        } else {
          renderCtx.fillStyle = `rgba(34, 211, 238, ${alpha})`;
        }
        renderCtx.fill();
      }

      animId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(signalInterval);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 520;
    const y = ((e.clientY - rect.top) / rect.height) * 520;
    mousePosRef.current = { x, y, isInside: true };

    // Find if near any node for tooltip
    // We deterministically map coordinates to categories for rich portfolio telemetry
    const relX = (x - 260) / 160;
    const relY = (y - 260) / 160;
    const distFromCenter = Math.hypot(relX, relY);

    if (distFromCenter < 1.15) {
      const angle = (Math.atan2(relY, relX) + Math.PI * 2) % (Math.PI * 2);
      const catIdx = Math.floor((angle / (Math.PI * 2)) * CATEGORIES.length);
      const cat = CATEGORIES[catIdx % CATEGORIES.length];
      setHoveredNodeInfo({
        category: cat.category,
        domain: cat.domain,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    } else {
      setHoveredNodeInfo(null);
    }
  };

  const handleMouseEnter = () => {
    setIsHoveringCore(true);
    mousePosRef.current.isInside = true;
  };

  const handleMouseLeave = () => {
    setIsHoveringCore(false);
    mousePosRef.current = { x: -999, y: -999, isInside: false };
    setHoveredNodeInfo(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="hero-neural-network-core"
      className="pointer-events-auto select-none relative w-[320px] sm:w-[420px] lg:w-[500px] xl:w-[540px] h-[320px] sm:h-[420px] lg:h-[500px] xl:h-[540px] cursor-crosshair group"
      aria-label="Interactive AI Neural Core"
    >
      {/* Subtle ambient core aura */}
      <div
        className="absolute inset-[20%] rounded-full blur-[70px] opacity-25 pointer-events-none transition-opacity duration-300 group-hover:opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.35) 0%, rgba(2,132,199,0.15) 50%, transparent 75%)',
        }}
      />

      {/* Primary Neural Network Core Canvas */}
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%' }}
        className="relative z-10 block"
      />

      {/* Technical HUD Overlay on Hover */}
      <div
        className={`absolute top-4 right-4 z-20 transition-all duration-300 pointer-events-none ${
          isHoveringCore ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
        }`}
      >
        <div className="p-3 rounded-lg border border-cyan-500/30 bg-[#07111C]/90 backdrop-blur-md font-mono text-[10px] text-neutral-300 shadow-xl space-y-1 min-w-[145px]">
          <div className="flex items-center justify-between text-cyan-300 font-bold border-b border-white/10 pb-1 mb-1.5">
            <span>AI CORE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <div className="flex items-center justify-between gap-3 text-neutral-400">
            <span>NODES</span>
            <span className="text-white font-semibold">{nodesCount}</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-neutral-400">
            <span>CONNECTIONS</span>
            <span className="text-white font-semibold">{connectionsCount}</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-neutral-400">
            <span>STATUS</span>
            <span className="text-emerald-400 font-semibold">ACTIVE</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-neutral-400">
            <span>SIGNAL</span>
            <span className="text-cyan-300 font-semibold animate-pulse">PROCESSING</span>
          </div>
        </div>
      </div>

      {/* Interactive Node Info Tooltip when near node */}
      {isHoveringCore && hoveredNodeInfo && (
        <div
          className="absolute z-30 pointer-events-none transition-all duration-100 ease-out"
          style={{
            left: `${Math.min(Math.max(hoveredNodeInfo.x - 60, 10), 380)}px`,
            top: `${Math.max(hoveredNodeInfo.y - 65, 15)}px`,
          }}
        >
          <div className="px-2.5 py-1.5 rounded-md border border-cyan-400/40 bg-[#091322]/95 backdrop-blur-md font-mono text-[9px] shadow-lg">
            <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <span className="w-1 h-1 rounded-full bg-cyan-400" />
              <span>NODE // {hoveredNodeInfo.category}</span>
            </div>
            <div className="text-neutral-400 mt-0.5">
              <span>STATUS // </span>
              <span className="text-emerald-400 font-semibold">ACTIVE</span>
            </div>
            <div className="text-neutral-300 text-[8px] tracking-wider mt-0.5">
              DOMAIN // {hoveredNodeInfo.domain}
            </div>
          </div>
        </div>
      )}

      {/* Technical HUD status label */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-[#07111C]/80 border border-cyan-500/20 font-mono text-[9px] text-cyan-300/80 tracking-widest backdrop-blur-md pointer-events-none select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#22d3ee]" />
        <span>AI NEURAL CORE // {isHoveringCore ? 'TELEMETRY ENGAGED' : 'ONLINE'}</span>
      </div>
    </div>
  );
};
