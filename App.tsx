
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { UploadRecord, VideoFormat, ChannelInfo, ProcessingStage } from './types';
import { fetchTrendAndMetadata } from './services/geminiService';
import Dashboard from './components/Dashboard';
import LoginModal from './components/LoginModal';

// Fix: All declarations of 'aistudio' must have identical modifiers and type.
// Based on the error, AIStudio is a known global type and is likely readonly.
declare global {
  interface Window {
    readonly aistudio: any;
  }
}

const App: React.FC = () => {
  const [isAutoActive, setIsAutoActive] = useState(false);
  const [uploads, setUploads] = useState<UploadRecord[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [niche, setNiche] = useState('AI Technology');
  const [tone, setTone] = useState('energetic');
  const [format, setFormat] = useState<VideoFormat>('shorts');
  const [timeLeft, setTimeLeft] = useState(60);
  
  // YouTube Connection State
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [channel, setChannel] = useState<ChannelInfo | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const uploadTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleOpenLogin = () => setShowLoginModal(true);
  const handleCloseLogin = () => setShowLoginModal(false);

  const setupMockChannel = (email: string) => {
    const namePart = email.split('@')[0];
    const channelName = namePart.charAt(0).toUpperCase() + namePart.slice(1) + " Studio";
    setChannel({
      name: channelName,
      handle: `@${namePart}`,
      subscribers: `${Math.floor(Math.random() * 500) + 1}K`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${namePart}`
    });
    setIsConnected(true);
  };

  const handleConnect = async (email: string) => {
    setIsConnecting(true);
    await new Promise(r => setTimeout(r, 1500));
    setupMockChannel(email);
    setIsConnecting(false);
    setShowLoginModal(false);
  };

  const handleGoogleLogin = async () => {
    try {
      if (window.aistudio) {
        await window.aistudio.openSelectKey();
        // Proceed as if successful due to the race condition requirement in guidelines
        setIsConnecting(true);
        await new Promise(r => setTimeout(r, 1500));
        setupMockChannel("google.user@gmail.com");
        setIsConnecting(false);
        setShowLoginModal(false);
      } else {
        // Fallback for environments without window.aistudio
        handleConnect("google.user@gmail.com");
      }
    } catch (err) {
      console.error("Google Login Error:", err);
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setIsAutoActive(false);
    setIsConnected(false);
    setChannel(null);
  };

  const performUpload = useCallback(async () => {
    if (isProcessing || !isConnected) return;

    setIsProcessing(true);
    const newId = Math.random().toString(36).substring(7);
    
    const initialRecord: UploadRecord = {
      id: newId,
      timestamp: new Date(),
      title: "Detecting High-Velocity Signals...",
      description: "ViralGrowth Engine is currently scanning global trends for peak virality...",
      status: 'pending',
      stage: 'trend_scouting',
      thumbnail: `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60&seed=${newId}`,
      format: format
    };

    setUploads(prev => [initialRecord, ...prev]);

    try {
      const growthData = await fetchTrendAndMetadata(niche, tone, format);
      
      const stages: ProcessingStage[] = [
        'strategy_mapping',
        'script_generation',
        'neural_rendering',
        'voice_synthesis',
        'qc_validation',
        'publishing'
      ];

      for (const stage of stages) {
        setUploads(prev => prev.map(u => 
          u.id === newId ? { 
            ...u, 
            title: growthData.title, 
            description: growthData.description, 
            status: 'processing',
            stage: stage,
            trendSource: growthData.trendTopic,
            sources: growthData.sources
          } : u
        ));
        await new Promise(r => setTimeout(r, 2000));
      }

      setUploads(prev => prev.map(u => 
        u.id === newId ? { 
          ...u, 
          status: 'uploaded',
          stage: 'publishing',
          metrics: {
            ctr: (Math.random() * 8 + 4).toFixed(1) + '%',
            retention: (Math.random() * 20 + 70).toFixed(0) + '%'
          },
          thumbnail: `https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop&q=60&seed=${newId}` 
        } : u
      ));
    } catch (err) {
      console.error("Upload failure:", err);
      setUploads(prev => prev.map(u => u.id === newId ? { ...u, status: 'failed' } : u));
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, isConnected, niche, tone, format]);

  // Handle continuous upload timer
  useEffect(() => {
    if (isAutoActive && isConnected) {
      // First one immediately
      performUpload();
      setTimeLeft(60);

      const interval = setInterval(() => {
        performUpload();
        setTimeLeft(60);
      }, 60000);
      
      uploadTimerRef.current = interval;
    } else {
      if (uploadTimerRef.current) clearInterval(uploadTimerRef.current);
    }
    return () => {
      if (uploadTimerRef.current) clearInterval(uploadTimerRef.current);
    };
  }, [isAutoActive, isConnected, performUpload]);

  // Handle countdown timer
  useEffect(() => {
    if (isAutoActive && isConnected) {
      const interval = setInterval(() => {
        setTimeLeft(prev => (prev > 1 ? prev - 1 : 60));
      }, 1000);
      timerRef.current = interval;
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setTimeLeft(60);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoActive, isConnected]);

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 selection:bg-indigo-500/30">
      <Dashboard 
        isConnected={isConnected}
        isConnecting={isConnecting}
        channel={channel}
        onConnect={handleOpenLogin}
        onDisconnect={handleDisconnect}
        isAutoActive={isAutoActive}
        onToggleAuto={() => setIsAutoActive(!isAutoActive)}
        uploads={uploads}
        isProcessing={isProcessing}
        niche={niche}
        setNiche={setNiche}
        tone={tone}
        setTone={setTone}
        format={format}
        setFormat={setFormat}
        timeLeft={timeLeft}
        onManualTrigger={performUpload}
      />
      
      {showLoginModal && (
        <LoginModal 
          onClose={handleCloseLogin} 
          onLogin={handleConnect} 
          onGoogleLogin={handleGoogleLogin}
          isConnecting={isConnecting} 
        />
      )}
    </div>
  );
};

export default App;
