import './global.css';
import { Container } from '@shared/components/container';
import { Space_Grotesk } from 'next/font/google';
import { ReactNode } from 'react';

import Providers from '../providers';

// If loading a variable font, you don't need to specify the font weight
// eslint-disable-next-line babel/new-cap
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Axiom',
  description: 'Decentralized Fact Checking',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={spaceGrotesk.className} lang="en">
      <body>
        <Providers>
          <Container>{children}</Container>
        </Providers>
      </body>
    </html>
  );
}
