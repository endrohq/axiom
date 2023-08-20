'use client';

import { useClaimDetails } from '@shared/hooks/useClaimDetails';
import { useUser } from '@shared/hooks/useUser';

import clsx from 'clsx';

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

  const isOnGoing = !claim?.verdict;

  return (
    <>
      <div
        className={clsx(
          'h-32 pt-10',
          isOnGoing ? ' bg-purple-50' : 'bg-gray-50',
        )}
      >
        <div className="mx-auto mt-2 w-1/2">
          <Header />
        </div>
      </div>
      <div className="mx-auto my-24 w-1/2 pb-20">
        <Consensus />
        {isParticipating && <Participate />}
        {!isParticipating && <Overview />}
      </div>
    </>
  );
}
