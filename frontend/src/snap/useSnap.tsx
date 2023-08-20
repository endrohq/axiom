'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { MetamaskAxiomSnap } from './api';

import { enableAxiomSnap } from '.';

export interface UseSnapContextProps {
  api?: MetamaskAxiomSnap;
}

export const UseSnapContext = createContext<UseSnapContextProps>({
  api: {} as MetamaskAxiomSnap,
});

export const useSnap = (): UseSnapContextProps => {
  const context = useContext(UseSnapContext);
  if (!context) {
    throw new Error(`useMetamask must be used within a MetaMaskProvider`);
  }
  return context;
};

type MetaMaskSnapProviderProps = {
  children: ReactNode;
};

export default function MetaMaskSnapProvider({
  children,
}: MetaMaskSnapProviderProps) {
  const [api, setApi] = useState<MetamaskAxiomSnap>();

  useEffect(() => {
    async function init() {
      const snap = await enableAxiomSnap();
      setApi(snap);
    }
    init();
  }, []);

  return (
    <UseSnapContext.Provider value={{ api }}>
      {children}
    </UseSnapContext.Provider>
  );
}
