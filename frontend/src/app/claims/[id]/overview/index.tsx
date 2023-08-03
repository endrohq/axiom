'use client';

import { maxFactCheckersCount } from '@env';
import { PlusOutlined } from '@shared/components/icons/PlusOutlined';
import { TeamOutlined } from '@shared/components/icons/TeamOutlined';
import { useClaimDetails } from '@shared/hooks/useClaimDetails';
import clsx from 'clsx';
import { useState } from 'react';

import FactCheckItem from './FactCheckItem';
import { ParticipateModal } from './ParticipateModal';

export default function Overview() {
  const { claim } = useClaimDetails();
  const [intentionToJoin, setIntentionToJoin] = useState<boolean>(false);

  if (!claim) return <div className="text-sm">Claim not found</div>;
  return (
    <>
      <div className="flex flex-col space-y-2 rounded">
        <div className="flex items-center space-x-4">
          <div className="mt-1 text-base font-medium">Fact Checks</div>
        </div>
        <div className="flex flex-col rounded-lg bg-gray-100 p-0.5">
          <div className="flex flex-col space-y-4 rounded bg-white p-1">
            {claim?.factCheckers?.map((item, idx) => (
              <FactCheckItem factCheck={item} idx={idx} key={idx} />
            ))}
            {(claim?.factCheckers?.length || 0) < maxFactCheckersCount && (
              <div className="!mt-2 border-t border-gray-100">
                <div
                  onClick={() => setIntentionToJoin(true)}
                  className="bg-transition mt-2 flex cursor-pointer items-center justify-center space-x-2 rounded bg-purple-50 px-4 py-3 text-primary hover:bg-purple-100"
                >
                  <PlusOutlined />
                  <div className="text-sm">Join fact check</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {intentionToJoin && (
        <ParticipateModal
          onSuccess={() => setIntentionToJoin(false)}
          claimId={claim?.id}
          isOpen={intentionToJoin}
          onClose={() => setIntentionToJoin(false)}
        />
      )}
    </>
  );
}
