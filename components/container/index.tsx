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
      <div
        style={{ height: 'calc(100% - 4rem)' }}
        className="container mx-auto pt-14"
      >
        {children}
      </div>
    </div>
  );
}
