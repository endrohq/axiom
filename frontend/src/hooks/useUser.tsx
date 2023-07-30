'use client';

import { useMetaMask } from '@shared/hooks/useMetaMask';
import { createContext, ReactNode, useContext, useMemo } from 'react';

import toast from 'react-hot-toast';

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

  async function handleLogout() {
    metamask.disconnect();
  }

  async function handleLogin() {
    try {
      await metamask.connect();
    } catch (error) {
      console.error(error);
      toast.error(
        'Make sure to install Metamask or refresh the page and try again',
      );
    }
  }

  const value = useMemo(() => {
    const isConnected = metamask.activeProvider?.isConnected();
    let address;
    if (isConnected) {
      address = metamask.activeProvider?.selectedAddress as string;
    }
    return {
      logout: handleLogout,
      address,
      isConnected: !!isConnected,
      login: handleLogin,
    };
  }, [handleLogin, metamask.activeProvider?.selectedAddress]);

  return (
    <AuthenticatedContext.Provider value={value}>
      {children}
    </AuthenticatedContext.Provider>
  );
}
