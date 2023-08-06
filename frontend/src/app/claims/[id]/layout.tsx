import ClaimsPageProvider from '@shared/hooks/useClaimDetails';
import { ReactNode } from 'react';

type LayoutProps = { params: { id: string }; children: ReactNode };

export default function Layout({ children, params }: LayoutProps) {
  return <ClaimsPageProvider id={params.id}>{children}</ClaimsPageProvider>;
}
