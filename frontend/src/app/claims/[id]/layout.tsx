import ClaimsPageProvider from '@shared/hooks/useClaimDetails';
import { ReactNode } from 'react';

type LayoutProps = { params: { id: string }; children: ReactNode };

export default function Layout({ children, params }: LayoutProps) {
  return (
    <div className="mx-auto mt-10 w-1/2">
      <ClaimsPageProvider id={params.id}>{children}</ClaimsPageProvider>
    </div>
  );
}
