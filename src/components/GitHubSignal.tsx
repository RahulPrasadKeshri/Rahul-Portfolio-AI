import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Github, GitBranch, GitCommit, ExternalLink, Star, Code2, Sparkles, FolderGit2 } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/links';
import { PROJECTS } from '../data/projects';

interface RepoMeta {
  name: string;
  description: string;
  language: string;
  url: string;
  status: string;
  topics: string[];
}

const VERIFIED_REPOSITORIES: RepoMeta[] = [
  {
    name: 'smarttrack',
    description: 'AI-assisted inventory and automated invoice lifecycle management system powered by FastAPI & Gemini.',
    language: 'TypeScript / Python',
    url: 'https://github.com/rahulprasadkeshri/smarttrack',
    status: 'PRODUCTION DEPLOYED',
    topics: ['react', 'fastapi', 'gemini-api', 'firestore', 'typescript'],
  },
  {
    name: 'crypto-pulse-bluestock',
    description: 'Real-time cryptocurrency price monitoring terminal built during internship at Bluestock Fintech.',
    language: 'TypeScript / React',
    url: 'https://github.com/rahulprasadkeshri/crypto-pulse-bluestock',
    status: 'FIELD DEPLOYED',
    topics: ['react', 'typescript', 'coingecko-api', 'tailwind'],
  },
  {
    name: 'rahul-keshri-portfolio',
    description: 'Autonomous developer knowledge operating system and portfolio with R//AI conversational assistant.',
    language: 'TypeScript',
    url: 'https://github.com/rahulprasadkeshri',
    status: 'ACTIVE HOSTED',
    topics: ['react', 'typescript', 'framer-motion', 'gemini'],
  },
];

export const GitHubSignal: React.FC = () => {
  const [repos, setRepos] = useState<RepoMeta[]>(VERIFIED_REPOSITORIES);
  const [sourceStatus, setSourceStatus] = useState<'VERIFIED REPOSITORIES' | 'LIVE SYNC'>('VERIFIED REPOSITORIES');

  useEffect(() => {
    let isMounted = true;

    // Optional safe fetch from public GitHub API (no token needed for public metadata)
    const fetchGitHub = async () => {
      try {
        const res = await fetch('https://api.github.com/users/rahulprasadkeshri/repos?sort=updated&per_page=5', {
          headers: { Accept: 'application/vnd.github.v3+json' },
        });

        if (res.ok && isMounted) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const fetchedRepos: RepoMeta[] = data.map((item: any) => ({
              name: item.name,
              description: item.description || 'Public software engineering repository.',
              language: item.language || 'TypeScript',
              url: item.html_url,
              status: item.archived ? 'ARCHIVED' : 'PUBLIC REPOSITORY',
              topics: item.topics && item.topics.length > 0 ? item.topics.slice(0, 4) : [item.language?.toLowerCase() || 'code'],
            }));
            setRepos(fetchedRepos);
            setSourceStatus('LIVE SYNC');
          }
        }
      } catch {
        // Graceful fallback to verified repositories without failing
      }
    };

    fetchGitHub();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="github-signal" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto font-mono">
      {/* Container card */}
      <div className="rounded-2xl border border-white/10 bg-[#080B12] p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg border border-white/10 bg-white/[0.03]">
              <Github className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  GITHUB // SIGNAL
                </h3>
                <span className="text-[10px] text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/30 bg-cyan-950/30">
                  {sourceStatus}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Authentic open-source codebases, branch discipline, and repositories.
              </p>
            </div>
          </div>

          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/15 bg-white/[0.04] hover:bg-white/10 text-xs text-neutral-200 hover:text-white transition-colors cursor-pointer"
          >
            <span>VIEW GITHUB PROFILE</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Repositories Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo) => (
            <div
              key={repo.name}
              className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-cyan-500/40 hover:bg-white/[0.04] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-white/5">
                  <div className="flex items-center gap-1.5 text-cyan-300 text-xs font-bold">
                    <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="group-hover:text-cyan-200 transition-colors">
                      {repo.name}
                    </span>
                  </div>
                  <span className="text-[9px] text-neutral-400 uppercase tracking-wider">
                    {repo.status}
                  </span>
                </div>

                <p className="mt-3 text-xs text-neutral-300 font-sans leading-relaxed line-clamp-2">
                  {repo.description}
                </p>

                {/* Topics / Technologies */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {repo.topics.map((topic, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 rounded text-[9px] text-neutral-400 bg-white/[0.03] border border-white/5"
                    >
                      #{topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>{repo.language}</span>
                </div>

                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
                >
                  <span>SOURCE</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer signal telemetry */}
        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between flex-wrap gap-2 text-[10px] text-neutral-400">
          <div className="flex items-center gap-2">
            <GitCommit className="w-3.5 h-3.5 text-emerald-400" />
            <span>COMMITS TIED TO VERIFIED WORKFLOWS & INTERNSHIP DELIVERABLES</span>
          </div>
          <span className="text-neutral-500">USER: rahulprasadkeshri</span>
        </div>
      </div>
    </section>
  );
};
