'use client';

import { maxFactCheckersCount } from '@env';
import { useClaimDetails } from '@shared/hooks/useClaimDetails';

import FactCheckItem from './FactCheckItem';
import IntentionToParticipate from './IntentionToParticipate';

export default function Overview() {
  const { claim } = useClaimDetails();

  if (!claim) return <div className="text-sm">Claim not found</div>;
  return (
    <>
      <div className="flex flex-col space-y-2 rounded">
        <div className="flex items-center space-x-1">
          <div className="mt-1 text-base font-medium">Fact Checks</div>
          <div className="rounded-full bg-gray-200 px-2 py-0.5 text-[10px] font-medium text-gray-700">
            {`${claim?.factCheckers?.length || 0} `}/
            {` ${maxFactCheckersCount}`}
          </div>
        </div>
        {claim?.factCheckers?.map((item, idx) => (
          <FactCheckItem factCheck={item} idx={idx} key={idx} />
        ))}
        <IntentionToParticipate />
      </div>
    </>
  );
}
