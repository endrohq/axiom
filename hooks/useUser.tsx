'use client';

import { MetaMaskSDK } from '@metamask/sdk';
import { isArrayWithElements } from '@shared/utils/array.utils';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import toast from 'react-hot-toast';

const MMSDK = new MetaMaskSDK();

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
  const [accounts, setAccounts] = useState<string[]>();

  async function handleLogout() {
    MMSDK.disconnect();
    setAccounts(undefined);
  }

  async function handleLogin() {
    try {
      const accounts = await MMSDK.connect();
      if (accounts) setAccounts(accounts as string[]);
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
      address: accounts?.[0],
      isConnected: isArrayWithElements(accounts),
      login: handleLogin,
    };
  }, [handleLogin, accounts]);

  return (
    <AuthenticatedContext.Provider value={value}>
      {children}
    </AuthenticatedContext.Provider>
  );
}
