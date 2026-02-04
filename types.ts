
export enum AIModule {
  NotebookLM = 'notebooklm',
  HeyGen = 'heygen',
  NanoBanana = 'nanobanana',
  Claude = 'claude',
  Veo3 = 'veo3',
  ElevenLabs = 'elevenlabs',
  Grok = 'grok',
  Notion = 'notion',
  Perplexity = 'perplexity'
}

export interface Task {
  id: string;
  title: string;
  status: 'todo' | 'doing' | 'done';
  deadline: string;
}

export interface SearchResult {
  text: string;
  sources: Array<{ title: string; uri: string }>;
}
