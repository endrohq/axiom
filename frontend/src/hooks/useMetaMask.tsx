'use client';

import { MetaMaskSDK } from '@metamask/sdk';
import { BrowserProvider, JsonRpcSigner } from 'ethers';
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

export interface AuthContextProps {
  metamask: MetaMaskSDK;
  signer: JsonRpcSigner | undefined;
}

export const MetaMaskContext = createContext<AuthContextProps>({
  metamask: {} as MetaMaskSDK,
  signer: undefined,
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
    async function init() {
      const isConnected = metamask.activeProvider?.isConnected();
      if (!isConnected) return;
      await metamask.connect();
      const provider = new BrowserProvider(metamask.getProvider(), 'any');
      if (provider) {
        const signer = await provider.getSigner();
        setSigner(signer);
      }
    }
    init();
  }, []);

  const value = useMemo(() => {
    return {
      metamask,
      signer,
    };
  }, [metamask, signer]);

  return (
    <MetaMaskContext.Provider value={value}>
      {children}
    </MetaMaskContext.Provider>
  );
}
