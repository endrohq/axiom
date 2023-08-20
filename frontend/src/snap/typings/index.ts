export interface CreateClaimRequest {
  method: 'axiom_createClaim';
  params: {
    message: string;
  };
}

export interface ConfigureRequest {
  method: 'fil_configure';
  params: {
    configuration: any;
  };
}

export type MetamaskAxiomRpcRequest = CreateClaimRequest | ConfigureRequest;

export interface SnapRpcMethodRequest {
  method: string;
  params: MetamaskAxiomRpcRequest;
}

export interface Message {
  to: string;
  from: string;
  nonce: number;
  value: string;
  gasfeecap: string;
  gaspremium: string;
  gaslimit: number;
  method: number;
  params?: string;
}

export interface MessageSignature {
  data: string;
  type: number;
}

export interface SignedMessage {
  message: Message;
  signature: MessageSignature;
}

export interface SignMessageResponse {
  signedMessage: SignedMessage;
  confirmed: boolean;
  error: Error;
}

export interface AxiomSnapApi {
  createClaim(message: string): Promise<SignMessageResponse>;
  configure(configuration?: Record<string, any>): Promise<void>;
}

declare global {
  interface Window {
    // @ts-ignore
    ethereum: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      request: <T>(
        request: SnapRpcMethodRequest | { method: string; params?: any },
      ) => Promise<T>;
      on: (eventName: unknown, callback: unknown) => unknown;
    };
  }
}
