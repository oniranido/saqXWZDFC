
import React, { useState } from 'react';
import { Mail, Lock, Chrome, ArrowRight, X, Cpu, Youtube, Zap } from 'lucide-react';

interface LoginModalProps {
  onClose: () => void;
  onLogin: (email: string) => void;
  onGoogleLogin: () => void; // Added onGoogleLogin
  isConnecting: boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin, onGoogleLogin, isConnecting }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onLogin(email);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-black/40 animate-in fade-in duration-300">
      <div className="glass-card w-full max-w-md rounded-[2.5rem] p-8 relative overflow-hidden shadow-[0_0_100px_rgba(99,102,241,0.2)]">
        {/* Decorative elements */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl" />
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-slate-500 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-indigo-600 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)]">
              <Zap size={24} className="text-white fill-current" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">System Authorization</h2>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">ViralGrowth AI Security</p>
            </div>
          </div>

          {isConnecting ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-indigo-500/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <Cpu className="absolute inset-0 m-auto text-indigo-400 animate-pulse" size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">Linking YouTube Core</h3>
                <p className="text-xs text-slate-400 max-w-[200px]">Handshaking with Google OAuth 2.0 and fetching channel metrics...</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="group">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 block ml-1">Creator Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={18} />
                    <input 
                      autoFocus
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. contact@yourchannel.com"
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl pl-12 pr-5 py-4 focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 text-white transition-all placeholder:text-slate-700"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  type="submit"
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-indigo-600/20 group transition-all"
                >
                  <Youtube size={18} />
                  <span className="uppercase tracking-widest text-xs">Authorize Channel</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center gap-4 py-2">
                  <div className="h-[1px] flex-1 bg-slate-800" />
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">or continue with</span>
                  <div className="h-[1px] flex-1 bg-slate-800" />
                </div>

                <button 
                  type="button"
                  onClick={onGoogleLogin}
                  className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-2xl flex items-center justify-center gap-3 transition-all"
                >
                  <Chrome size={18} />
                  <span className="uppercase tracking-widest text-xs">Sign in with Google</span>
                </button>
              </div>

              <p className="text-[9px] text-center text-slate-600 leading-relaxed px-4">
                By connecting, you authorize <span className="text-slate-400 font-bold">ViralGrowth AI</span> to access your YouTube analytics and manage video uploads via the official API.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
