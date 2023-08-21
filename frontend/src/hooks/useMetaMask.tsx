'use client';

import { MetaMaskSDK } from '@metamask/sdk';
import { ChainConfig } from '@shared/typings';
import { BrowserProvider, JsonRpcProvider, JsonRpcSigner } from 'ethers';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { lineaTestnet, localNetwork } from '../config/chains';

const metamask = new MetaMaskSDK({
  dappMetadata: {
    name: 'Axiom',
  },
});

export interface AuthContextProps {
  metamask: MetaMaskSDK;
  signer?: JsonRpcSigner;
  provider?: JsonRpcProvider;
  targetNetwork: ChainConfig;
}

export const MetaMaskContext = createContext<AuthContextProps>({
  metamask,
  targetNetwork: localNetwork,
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
  const targetNetwork = useMemo(() => {
    return process.env.NEXT_PUBLIC_TARGET_CHAIN === '0xe704'
      ? lineaTestnet
      : localNetwork;
  }, [process.env.NEXT_PUBLIC_TARGET_CHAIN]);

  useEffect(() => {
    init();
    metamask?.activeProvider?.on('accountsChanged', (accounts: any) => {
      if (accounts?.length === 0) {
        setSigner(undefined);
      } else {
        init();
      }
    });
    return () => {
      metamask?.activeProvider?.removeAllListeners('accountsChanged');
    };
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
      provider: new JsonRpcProvider(targetNetwork?.rpcUrls[0]),
      targetNetwork,
    };
  }, [metamask, signer, targetNetwork]);

  return (
    <MetaMaskContext.Provider value={value}>
      {children}
    </MetaMaskContext.Provider>
  );
}
