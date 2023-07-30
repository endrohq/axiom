export type RequestState = 'idle' | 'loading' | 'success' | 'error';

export interface ChatMessageWithRole {
  role: 'assistant' | 'user';
  content?: string;
  state: RequestState;
}

export interface Choice {
  index: number;
  finish_reason: string;
  message: ChatMessageWithRole;
}

export interface GptResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
}

export interface Claim {
  id: string;
  cid: string;
  claim: string;
  source: string;
}

export type MenuItem<T> = {
  label: string;
  id: T;
};