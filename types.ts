
export type VideoFormat = 'shorts' | 'long' | 'both';

export type ProcessingStage = 
  | 'trend_scouting' 
  | 'strategy_mapping' 
  | 'script_generation' 
  | 'neural_rendering' 
  | 'voice_synthesis' 
  | 'qc_validation' 
  | 'publishing';

export interface UploadRecord {
  id: string;
  timestamp: Date;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'uploaded' | 'failed';
  stage?: ProcessingStage;
  thumbnail: string;
  format: VideoFormat;
  trendSource?: string;
  sources?: { web: { uri: string; title: string } }[];
  metrics?: {
    ctr: string;
    retention: string;
  };
}

export interface GenerationConfig {
  niche: string;
  tone: string;
  format: VideoFormat;
}

export interface ChannelInfo {
  name: string;
  subscribers: string;
  handle: string;
  avatar: string;
}
