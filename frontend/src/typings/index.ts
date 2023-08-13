export type AddressHash = `0x${string}`;
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

export interface FactChecker {
  factChecker: string;
  cid: string;
  dateStarted: Date;
  dateCompleted: Date;
  status: 'pending' | 'completed' | 'rejected';
}

export interface OnChainClaim {
  id: string;
  cid: string;
  factCheckers: FactChecker[];
  assumption: Verdict;
  verdict: Verdict;
  createdBy: string;
}
export interface IpfsClaim {
  id: string;
  cid: string;
  claim: string;
  source: string;
  topics: NlpTopic[];
}

export type Claim = IpfsClaim & OnChainClaim;

export type MenuItem<T> = {
  label: string;
  id: T;
};

export enum ClaimContractEvents {
  ClaimCreated = 'ClaimCreated',
  FactCheckerRegistered = 'FactCheckerRegistered',
  VerdictSubmitted = 'VerdictSubmitted',
}

export interface Evidence {
  url?: string;
  description?: string;
  title?: string;
  image?: string;
}

export enum Verdict {
  TRUE,
  FALSE,
  UNVERIFIABLE,
}

export interface NlpTopic {
  text: string;
  label: string;
}
