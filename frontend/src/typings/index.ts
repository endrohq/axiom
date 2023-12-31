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
  verdict: Verdict;
  factChecker: string;
  cid: string;
  dateStarted: Date;
  dateCompleted: Date;
  status: 'pending' | 'completed' | 'rejected';
}

export interface FactCheckerIpfsData {
  evidence: {
    url: string;
  };
}

export interface OnChainClaim {
  id: string;
  cid: string;
  factCheckers: FactChecker[];
  assumption: Verdict;
  verdict: Verdict;
  claim: string;
  origin: string;
  createdBy: string;
}
export interface IpfsClaim {
  id: string;
  cid: string;
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
  TRUE = 'TRUE',
  FALSE = 'FALSE',
  UNVERIFIABLE = 'UNVERIFIABLE',
}

export interface NlpTopic {
  text: string;
  label: string;
}

interface Author {
  name: string;
  avatar: string;
}

interface ParagraphContent {
  type: 'paragraph';
  text: string;
}

interface ImageContent {
  type: 'image';
  url: string;
  caption: string;
}

type ArticleContent = ParagraphContent | ImageContent;

export interface Article {
  title: string;
  subtitle: string;
  author: Author;
  publicationDate: string;
  coverImage: string;
  content: ArticleContent[];
}

export interface ChainConfig {
  chainId: string;
  chainName: string;
  rpcUrls: string[];
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}
