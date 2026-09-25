import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Lock, Shield, Check, Key, AlertCircle, Save, Database, Cpu } from 'lucide-react';
import { getAdminAuthState, saveAdminAuthState, clearAdminAuthState, verifyAdminPasscode } from '../services/admin';
import { isFirebaseConfigured, firebaseConfig } from '../services/firebase';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [authState, setAuthState] = useState(getAdminAuthState());
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPasscode(passcode)) {
      const newState = {
        isAuthenticated: true,
        userEmail: 'rahulprasadkeshri5@gmail.com',
        role: 'admin' as const,
      };
      setAuthState(newState);
      saveAdminAuthState(newState);
      setErrorMsg('');
      setSuccessMsg('Authenticated as System Administrator.');
    } else {
      setErrorMsg('Invalid administrative security key. Access restricted.');
    }
  };

  const handleLogout = () => {
    clearAdminAuthState();
    setAuthState({
      isAuthenticated: false,
      userEmail: null,
      role: 'guest',
    });
    setSuccessMsg('Admin session terminated.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md font-mono">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-xl rounded-2xl border border-white/20 bg-[#090C14] shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#0D101A] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-cyan-400">
            <Lock className="w-4 h-4" />
            <span className="font-bold text-white tracking-wider">ADMINISTRATIVE GATEWAY</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-xs text-neutral-300">
          <div className="p-3.5 rounded-lg border border-white/10 bg-white/[0.02] space-y-1">
            <div className="text-[11px] text-neutral-400 uppercase font-semibold">
              SECURITY PROTOCOL NOTICE
            </div>
            <p className="text-neutral-300 font-sans text-xs">
              Recruiters and visitors do not need to authenticate. This portal is reserved for Rahul to manage centralized data records and test Firebase Authentication connections.
            </p>
          </div>

          {!authState.isAuthenticated ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] text-neutral-400 uppercase">
                  ADMINISTRATIVE PASSKEY / DEV TOKEN
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter security passcode..."
                    className="w-full bg-[#05070B] border border-white/15 rounded px-3 py-2 text-neutral-200 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <span className="text-[10px] text-neutral-400 block">
                  Hint: Developer override token is: <code className="text-cyan-300">system-override</code>
                </span>
              </div>

              {errorMsg && (
                <div className="p-2.5 rounded bg-red-950/40 border border-red-500/30 text-red-300 text-[11px] flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors cursor-pointer"
              >
                AUTHENTICATE
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="p-3 rounded bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Authenticated: {authState.userEmail}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-neutral-400 hover:text-white underline text-[11px] cursor-pointer"
                >
                  DISCONNECT
                </button>
              </div>

              {/* Firebase Environment Status */}
              <div className="p-3.5 rounded border border-white/10 bg-white/[0.02] space-y-2">
                <div className="text-[11px] text-neutral-400 uppercase font-semibold flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-yellow-400" />
                  <span>FIREBASE ARCHITECTURE AUDIT</span>
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">PROJECT ID:</span>
                    <span className="text-neutral-200">{firebaseConfig.projectId || 'CONFIGURED VIA ENV'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">AUTH PROVIDER:</span>
                    <span className="text-neutral-200">Firebase Auth / Email + Google</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">FIRESTORE STORAGE:</span>
                    <span className="text-emerald-400">Initialized Architecture Ready</span>
                  </div>
                </div>
              </div>

              {/* Data Synced status */}
              <div className="p-3.5 rounded border border-white/10 bg-white/[0.02] space-y-2">
                <div className="text-[11px] text-neutral-400 uppercase font-semibold flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>CENTRALIZED KNOWLEDGE STATUS</span>
                </div>
                <p className="text-neutral-300 font-sans text-xs">
                  Portfolio facts are synchronized from <code className="text-cyan-300">src/data/</code> directly into the R//AI assistant system prompt and recruiter briefing engine.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/10 bg-[#0A0D15] flex justify-end">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded border border-white/10 text-neutral-300 hover:text-white text-xs cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </motion.div>
    </div>
  );
};
