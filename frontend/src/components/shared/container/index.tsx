import { WrongNetwork } from '@shared/components/container/WrongNetwork';
import AuthenticatedProvider from '@shared/hooks/useUser';
import { ReactNode } from 'react';

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
        <WrongNetwork />
      </div>
    </AuthenticatedProvider>
  );
}
