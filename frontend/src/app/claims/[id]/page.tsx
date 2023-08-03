'use client';

import { useClaimDetails } from '@shared/hooks/useClaimDetails';
import { useUser } from '@shared/hooks/useUser';

import Consensus from './Consensus';
import { Header } from './header';
import Overview from './overview';
import Participate from './participate';

export default function Page() {
  const { claim } = useClaimDetails();
  const { address } = useUser();

  const isParticipating = claim?.factCheckers?.find(
    factChecker =>
      factChecker.factCheckerAddress?.toLowerCase() ===
        address?.toLowerCase() && factChecker.status === 'pending',
  );

  return (
    <>
      <Header />
      <Consensus />
      {isParticipating && <Participate />}
      {!isParticipating && <Overview />}
    </>
  );
}
