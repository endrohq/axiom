import { ReactNode } from 'react';

import MetaMaskSnapProvider from '../../snap/useSnap';

export const metadata = {
  title: 'Blog Use Case',
  description: 'Decentralized Fact Checking',
};

export default function Layout({ children }: { children: ReactNode }) {
  return <MetaMaskSnapProvider>{children}</MetaMaskSnapProvider>;
}
