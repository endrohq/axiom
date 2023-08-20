'use client';

import { useMetaMask } from '@shared/hooks/useMetaMask';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { toast } from 'react-hot-toast';

export interface AuthContextProps {
  logout(): Promise<void>;
  login(): void;
  address: string | undefined;
  isConnected: boolean;
}

export const AuthenticatedContext = createContext<AuthContextProps>({
  logout: async () => {},
  login: () => {},
  address: undefined,
  isConnected: false,
});

export const useUser = (): AuthContextProps => {
  const context = useContext(AuthenticatedContext);
  if (!context) {
    throw new Error(
      `useAuthentication must be used within a AuthenticatedProvider`,
    );
  }
  return context;
};

type AuthenticatedProviderProps = {
  children: ReactNode;
};

export default function AuthenticatedProvider({
  children,
}: AuthenticatedProviderProps) {
  const { metamask } = useMetaMask();
  const [address, setAddress] = useState<string>();

  useEffect(() => {
    getUser();
    metamask?.activeProvider?.on('accountsChanged', (accounts: any) => {
      if (accounts?.length === 0) {
        setAddress(undefined);
      } else {
        getUser();
      }
    });
    return () => {
      metamask?.activeProvider?.removeAllListeners('accountsChanged');
    };
  }, []);

  async function getUser() {
    try {
      const accounts: any = await metamask?.activeProvider?.request({
        method: 'eth_requestAccounts',
      });
      console.log(accounts?.[0]);
      setAddress(accounts?.[0]);
    } catch (error: any) {
      if (error?.code === 4001) {
        toast('Please connect to MetaMask.');
      } else if (error?.code === -32002) {
        toast('Open Metamask to continue.');
      } else {
        console.error(error);
      }
    }
  }

  async function handleLogout() {
    setAddress(undefined);
  }

  async function handleLogin() {
    try {
      await getUser();
    } catch (error) {
      console.error(error);
      toast.error(
        'Make sure to install Metamask or refresh the page and try again',
      );
    }
  }

  const value = useMemo(() => {
    return {
      logout: handleLogout,
      address,
      isConnected: !!address,
      login: handleLogin,
    };
  }, [handleLogin, address]);

  return (
    <AuthenticatedContext.Provider value={value}>
      {children}
    </AuthenticatedContext.Provider>
  );
}
