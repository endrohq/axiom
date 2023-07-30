import './global.css';
import { Container } from '@shared/components/container';
import { Space_Grotesk } from 'next/font/google';
import { ReactNode } from 'react';

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
        <Container>{children}</Container>
      </body>
    </html>
  );
}
