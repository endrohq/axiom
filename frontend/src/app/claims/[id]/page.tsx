'use client';

import { useClaimDetails } from '@shared/hooks/useClaimDetails';
import { useUser } from '@shared/hooks/useUser';

import Consensus from './consensus';
import { Header } from './header';
import Overview from './overview';
import Participate from './participate';

export default function Page() {
  const { claim } = useClaimDetails();
  const { address } = useUser();

  const isParticipating = claim?.factCheckers?.find(
    factChecker =>
      factChecker.factChecker?.toLowerCase() === address?.toLowerCase() &&
      factChecker.status === 'pending',
  );

  console.log(claim);

  return (
    <>
      <div className="h-32 bg-purple-50 pt-10">
        <div className="mx-auto mt-2 w-1/2">
          <Header />
        </div>
      </div>
      <div className="mx-auto mt-24 w-1/2">
        <Consensus />
        {isParticipating && <Participate />}
        {!isParticipating && <Overview />}
      </div>
    </>
  );
}
