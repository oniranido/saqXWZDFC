
import React from 'react';
import { UploadRecord, VideoFormat, ChannelInfo } from '../types';
import ActivityCard from './ActivityCard';
import { Play, Square, Settings, Upload, Clock, BarChart3, Database, Zap, Cpu, Youtube, Link, CheckCircle2, AlertTriangle, Monitor, Smartphone, TrendingUp, Users } from 'lucide-react';

interface DashboardProps {
  isConnected: boolean;
  isConnecting: boolean;
  channel: ChannelInfo | null;
  onConnect: () => void;
  isAutoActive: boolean;
  onToggleAuto: () => void;
  uploads: UploadRecord[];
  isProcessing: boolean;
  niche: string;
  setNiche: (val: string) => void;
  tone: string;
  setTone: (val: string) => void;
  format: VideoFormat;
  setFormat: (val: VideoFormat) => void;
  timeLeft: number;
  onManualTrigger: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  isConnected, isConnecting, channel, onConnect,
  isAutoActive, onToggleAuto, uploads, isProcessing,
  niche, setNiche, tone, setTone, format, setFormat,
  timeLeft, onManualTrigger
}) => {
  const publishedCount = uploads.filter(u => u.status === 'uploaded').length;

  return (
    <div className="min-h-screen p-6 md:p-10 flex flex-col gap-8 max-w-[1500px] mx-auto relative z-10">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg shadow-lg">
              <Zap size={22} className="text-white fill-current" />
            </div>
            <span className="text-[10px] font-black tracking-[0.4em] text-indigo-400 uppercase">Autonomous Creator V3.0</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter glow-text">
            ViralGrowth <span className="text-indigo-500">AI</span>
          </h1>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
            <button 
              onClick={() => setFormat('shorts')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${format === 'shorts' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Smartphone size={14} /> Shorts
            </button>
            <button 
              onClick={() => setFormat('long')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${format === 'long' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Monitor size={14} /> Long
            </button>
          </div>

          <div className="h-10 w-[1px] bg-slate-800 mx-2 hidden lg:block" />

          {isConnected ? (
            <button 
              onClick={onToggleAuto}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black transition-all border ${
                isAutoActive ? 'bg-red-500/10 text-red-500 border-red-500/40 hover:bg-red-500/20' : 'bg-indigo-600 text-white border-indigo-400/30 shadow-xl hover:-translate-y-0.5 active:scale-95'
              }`}
            >
              {isAutoActive ? <Square size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
              <span className="uppercase tracking-widest text-xs">{isAutoActive ? `ACTIVE (00:${timeLeft < 10 ? '0' : ''}${timeLeft})` : 'ENGAGE ENGINE'}</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs font-bold text-amber-500 bg-amber-500/5 px-5 py-4 rounded-2xl border border-amber-500/20 animate-pulse">
              <AlertTriangle size={14} /> System Idle: Auth Required
            </div>
          )}
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        <aside className="lg:col-span-4 space-y-6">
          {/* Channel Info */}
          <div className="glass-card rounded-[2.5rem] p-6 relative overflow-hidden group border-white/5 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600/10 flex items-center justify-center">
                  <Youtube className="text-red-600" size={20} />
                </div>
                <h2 className="text-sm font-black text-slate-300 uppercase tracking-widest">Linked Terminal</h2>
              </div>
              {isConnected && <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />}
            </div>

            {isConnected ? (
              <div className="flex items-center gap-4 p-4 bg-slate-950/60 rounded-3xl border border-slate-800 shadow-inner">
                <img src={channel?.avatar} className="w-14 h-14 rounded-2xl border-2 border-indigo-500/50 shadow-lg" alt="Avatar" />
                <div>
                  <div className="text-white font-black text-lg leading-tight">{channel?.name}</div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                    <Users size={10} className="text-indigo-400" /> {channel?.subscribers} Subscribed
                  </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={onConnect}
                disabled={isConnecting}
                className="w-full py-5 rounded-3xl bg-indigo-600 text-white font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-indigo-500 transition-all disabled:opacity-50 shadow-lg active:scale-95"
              >
                {isConnecting ? <Cpu className="animate-spin" size={18} /> : <Link size={18} />}
                {isConnecting ? 'Mapping Protocol...' : 'Connect YouTube'}
              </button>
            )}
          </div>

          {/* Stats / Learning Loop */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card rounded-[2rem] p-5 border-l-4 border-indigo-500">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Assets</div>
              <div className="text-3xl font-black text-white">{publishedCount}</div>
            </div>
            <div className="glass-card rounded-[2rem] p-5 border-l-4 border-emerald-500">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Avg CTR</div>
              <div className="text-3xl font-black text-emerald-400">8.4%</div>
            </div>
          </div>

          {/* Config Card */}
          <div className="glass-card rounded-[2.5rem] p-7 space-y-7 border-white/5">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-indigo-500" size={18} />
              <h2 className="text-sm font-black text-slate-300 uppercase tracking-widest">Optimization Strategy</h2>
            </div>
            
            <div className="space-y-5">
              <div className="group">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block ml-1">Target Niche Domain</label>
                <input 
                  type="text" 
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full bg-slate-950/70 border border-slate-800 rounded-2xl px-5 py-4 focus:outline-none focus:border-indigo-500/50 text-white text-sm font-bold shadow-inner"
                  placeholder="e.g. Finance, Tech, Comedy"
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block ml-1">Viral Voice Model</label>
                <div className="grid grid-cols-1 gap-2">
                  {['energetic', 'professional', 'humorous', 'educational'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`px-5 py-3 rounded-xl border text-[10px] font-black uppercase tracking-[0.2em] text-left transition-all ${
                        tone === t ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400 shadow-inner' : 'bg-slate-900/40 border-slate-800 text-slate-600 hover:border-slate-700'
                      }`}
                    >
                      {t.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={onManualTrigger}
                disabled={isProcessing || !isConnected}
                className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-2 disabled:opacity-20 active:scale-95"
              >
                <Upload size={14} /> Force Growth Pulse
              </button>
            </div>
          </div>
        </aside>

        {/* Content Stream */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-indigo-500 rounded-full" />
              <h2 className="text-2xl font-black text-white tracking-tighter">Transmission Feed</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                System: {isAutoActive ? 'CONTINUOUS_PUSH_V3' : 'READY_STANDBY'}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 overflow-y-auto max-h-[850px] pr-2 custom-scrollbar">
            {uploads.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-40 glass-card rounded-[4rem] border-dashed border-2 border-slate-800/50 opacity-60">
                <div className="relative mb-6">
                  <Database size={56} className="text-slate-800" />
                  <div className="absolute inset-0 bg-indigo-500/20 blur-3xl animate-pulse" />
                </div>
                <p className="text-sm font-black text-slate-700 uppercase tracking-[0.4em]">Listening for Trend Signals</p>
                <p className="text-[10px] text-slate-800 mt-2">Activate the engine to begin autonomous generation</p>
              </div>
            ) : (
              uploads.map((upload) => (
                <ActivityCard key={upload.id} upload={upload} />
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
