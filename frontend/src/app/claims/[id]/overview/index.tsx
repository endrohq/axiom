'use client';

import { useClaimDetails } from '@shared/hooks/useClaimDetails';

import FactCheckItem from './FactCheckItem';
import IntentionToParticipate from './IntentionToParticipate';

export default function Overview() {
  const { claim } = useClaimDetails();

  if (!claim) return <div className="text-sm">Claim not found</div>;
  return (
    <>
      <div className="flex flex-col space-y-2 rounded">
        <div className="flex items-center space-x-4">
          <div className="mt-1 text-base font-medium">Fact Checks</div>
        </div>
        <div className="flex flex-col rounded-lg bg-gray-100 p-0.5">
          <div className="flex flex-col space-y-4 rounded-lg bg-white p-1">
            {claim?.factCheckers?.map((item, idx) => (
              <FactCheckItem factCheck={item} idx={idx} key={idx} />
            ))}
            <IntentionToParticipate />
          </div>
        </div>
      </div>
    </>
  );
}
