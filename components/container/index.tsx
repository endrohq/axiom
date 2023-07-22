import { ReactNode } from 'react';

import AuthenticatedProvider from '../../hooks/useUser';
import { Header } from '../header';

interface ContainerProps {
  children: ReactNode;
  withTopPadding?: boolean;
  withWidth?: boolean;
  showConnectWallet?: boolean;
}

export function Container({ children }: ContainerProps) {
  return (
    <AuthenticatedProvider>
      <div className="h-screen">
        <Header />
        <div style={{ height: 'calc(100% - 4rem)' }} className="mx-auto">
          {children}
        </div>
      </div>
    </AuthenticatedProvider>
  );
}
