// Chat service disabled
export type NovaMode = 'explain' | 'quiz' | 'debug' | 'summarise' | 'whatnext';

export interface NovaChatMessage {
  id: string;
  sender: 'user' | 'nova';
  text: string;
  timestamp: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
}

export async function sendNovaMessage(_params: any): Promise<NovaChatMessage> {
  return {
    id: 'disabled',
    sender: 'nova',
    text: 'Chat service has been disabled.',
    timestamp: new Date().toISOString(),
  };
}
