
import React from 'react';
import { UploadRecord, ProcessingStage } from '../types';
// Fix: Added TrendingUp to the list of imported icons from lucide-react
import { CheckCircle2, Loader2, Sparkles, Youtube, ExternalLink, Globe, BarChart2, ShieldCheck, Zap, MessageSquare, Mic, PlayCircle, TrendingUp } from 'lucide-react';

interface ActivityCardProps {
  upload: UploadRecord;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ upload }) => {
  const getStageDisplay = (stage?: ProcessingStage) => {
    switch (stage) {
      case 'trend_scouting': return { text: 'Scouting Real-time Trends', icon: <Globe size={12} /> };
      case 'strategy_mapping': return { text: 'Mapping Content Strategy', icon: <Zap size={12} /> };
      case 'script_generation': return { text: 'Scripting Retention Hooks', icon: <MessageSquare size={12} /> };
      case 'neural_rendering': return { text: 'AI Video Neural Synthesis', icon: <PlayCircle size={12} /> };
      case 'voice_synthesis': return { text: '100% AI Voice Generation', icon: <Mic size={12} /> };
      case 'qc_validation': return { text: 'Zero-Glitch QC Protocol', icon: <ShieldCheck size={12} /> };
      case 'publishing': return { text: 'Auto-Publishing to YT', icon: <Youtube size={12} /> };
      default: return { text: 'Neural Identification', icon: <Sparkles size={12} /> };
    }
  };

  const stageInfo = getStageDisplay(upload.stage);

  return (
    <div className={`glass-card rounded-[2.5rem] p-6 flex flex-col md:flex-row gap-8 relative group border-white/5 transition-all duration-500 hover:border-indigo-500/40 hover:bg-slate-900/40 ${
      upload.status === 'processing' ? 'after:absolute after:bottom-0 after:left-0 after:h-1 after:bg-indigo-500 after:animate-progress shadow-[0_0_20px_rgba(99,102,241,0.1)]' : ''
    }`}>
      <div className={`relative w-full md:w-64 aspect-[${upload.format === 'shorts' ? '9/16' : '16/9'}] rounded-3xl overflow-hidden bg-slate-950 flex-shrink-0 shadow-2xl border border-white/10`}>
        <img 
          src={upload.thumbnail} 
          className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${upload.status === 'pending' ? 'opacity-5 grayscale' : 'opacity-80 group-hover:opacity-100'}`}
          alt="Asset Preview" 
        />
        
        {/* Format Badge */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {upload.status === 'uploaded' && (
            <div className="px-3 py-1.5 bg-red-600 rounded-xl flex items-center gap-2 shadow-2xl">
              <Youtube size={12} className="text-white fill-current" />
              <span className="text-[10px] font-black text-white uppercase tracking-tighter">LIVE</span>
            </div>
          )}
          <div className="px-3 py-1.5 bg-slate-900/90 backdrop-blur-md rounded-xl flex items-center gap-2 border border-white/10 shadow-xl">
             <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">{upload.format}</span>
          </div>
        </div>

        {upload.status === 'processing' && (
           <div className="absolute inset-0 bg-indigo-500/10 flex items-center justify-center backdrop-blur-[2px]">
              <div className="relative">
                <Loader2 className="text-indigo-400 animate-spin" size={32} />
                <div className="absolute inset-0 blur-xl bg-indigo-500/30 rounded-full animate-pulse" />
              </div>
           </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between py-2 min-w-0">
        <div className="space-y-4">
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-xl font-black text-white truncate leading-tight tracking-tight group-hover:text-indigo-300 transition-colors">
              {upload.title}
            </h3>
            <div className="flex flex-col items-end">
               <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
                {upload.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>
          </div>
          
          <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed font-medium">
            {upload.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {upload.metrics ? (
              <>
                <div className="flex items-center gap-2 bg-emerald-500/5 px-3 py-1.5 rounded-xl border border-emerald-500/10">
                  <BarChart2 size={12} className="text-emerald-500" />
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{upload.metrics.ctr} CTR</span>
                </div>
                <div className="flex items-center gap-2 bg-indigo-500/5 px-3 py-1.5 rounded-xl border border-indigo-500/10">
                  <TrendingUp size={12} className="text-indigo-500" />
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{upload.metrics.retention} Retention</span>
                </div>
              </>
            ) : (
              <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border transition-all ${
                upload.status === 'uploaded' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 
                upload.status === 'processing' ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 
                'bg-slate-950 border-slate-800 text-slate-600'
              }`}>
                {stageInfo.icon}
                <span className="text-[11px] font-black uppercase tracking-[0.15em]">
                  {upload.status === 'uploaded' ? 'Viral Signal Published' : stageInfo.text}
                </span>
              </div>
            )}
          </div>

          {upload.sources && upload.sources.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-800/50">
              {upload.sources.slice(0, 2).map((s, i) => (
                <a 
                  key={i} 
                  href={s.web.uri} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-indigo-400 transition-colors bg-slate-950/50 px-3 py-1 rounded-lg border border-slate-800"
                >
                  <Globe size={10} /> {s.web.title || 'Intelligence Hub'}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end mt-6">
          {upload.status === 'uploaded' && (
            <a 
              href="#" 
              onClick={(e) => e.preventDefault()}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-indigo-500/50 transition-all font-black text-[10px] uppercase tracking-widest"
            >
              <ExternalLink size={14} /> View Analytics
            </a>
          )}
        </div>
      </div>
      <style>{`
        @keyframes progress {
          0% { width: 0; left: 0; }
          100% { width: 100%; left: 0; }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default ActivityCard;
