import { Header } from '../header';

interface ContainerProps {
  children: React.ReactNode;
  withTopPadding?: boolean;
  withWidth?: boolean;
  showConnectWallet?: boolean;
}

export function Container({ children }: ContainerProps) {
  return (
    <div className="h-screen">
      <Header />
      <div style={{ height: 'calc(100% - 4rem)' }} className="mx-auto">
        {children}
      </div>
    </div>
  );
}
