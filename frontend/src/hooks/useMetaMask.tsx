'use client';

import { MetaMaskSDK } from '@metamask/sdk';
import { BrowserProvider, JsonRpcProvider, JsonRpcSigner } from 'ethers';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const metamask = new MetaMaskSDK({
  dappMetadata: {
    name: 'Axiom',
  },
});

const provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);

export interface AuthContextProps {
  metamask: MetaMaskSDK;
  signer?: JsonRpcSigner;
  provider?: JsonRpcProvider;
}

export const MetaMaskContext = createContext<AuthContextProps>({
  metamask,
});

export const useMetaMask = (): AuthContextProps => {
  const context = useContext(MetaMaskContext);
  if (!context) {
    throw new Error(`useMetamask must be used within a MetaMaskProvider`);
  }
  return context;
};

type MetaMaskProviderProps = {
  children: ReactNode;
};

export default function MetaMaskProvider({ children }: MetaMaskProviderProps) {
  const [signer, setSigner] = useState<JsonRpcSigner>();

  useEffect(() => {
    init();
  }, []);

  async function init() {
    if (!metamask.activeProvider?.isConnected()) return;
    const provider = metamask.getProvider();
    if (!provider) return;
    const signerProvider = new BrowserProvider(metamask.getProvider(), 'any');
    if (signerProvider) {
      const signer = await signerProvider.getSigner();
      setSigner(signer);
    }
  }

  const value = useMemo(() => {
    return {
      metamask,
      signer,
      provider,
    };
  }, [metamask, signer]);

  return (
    <MetaMaskContext.Provider value={value}>
      {children}
    </MetaMaskContext.Provider>
  );
}
