'use client';

import { maxFactCheckersCount } from '@env';
import { PlusOutlined } from '@shared/components/icons/PlusOutlined';
import { useClaimDetails } from '@shared/hooks/useClaimDetails';
import { useUser } from '@shared/hooks/useUser';
import clsx from 'clsx';
import { useState } from 'react';

import { ParticipateModal } from './ParticipateModal';

export default function IntentionToParticipate() {
  const { claim } = useClaimDetails();
  const { isConnected, address } = useUser();
  const [intentionToJoin, setIntentionToJoin] = useState<boolean>(false);

  const canParticipate =
    isConnected &&
    claim?.factCheckers?.length < maxFactCheckersCount &&
    !claim?.factCheckers?.find(
      fc => fc.factChecker?.toLowerCase() === address?.toLowerCase(),
    );

  const hasFactCheckers = claim?.factCheckers?.length > 0;

  return (
    <>
      <div
        className={clsx(hasFactCheckers && '!mt-2 border-t border-gray-100')}
      >
        <div
          onClick={() => canParticipate && setIntentionToJoin(true)}
          className={clsx(
            'bg-transition flex items-center justify-center space-x-2 rounded px-4 py-3 text-sm ',
            canParticipate
              ? 'cursor-pointer bg-primary text-primary hover:bg-purple-100'
              : 'bg-white',
            hasFactCheckers && 'mt-2',
          )}
        >
          {canParticipate ? (
            <>
              <PlusOutlined />
              <div className="">Join fact check</div>
            </>
          ) : (
            <span className="space-x-2">
              <span>🎉</span>
              <span className="text-gray-500">Already Participating</span>
            </span>
          )}
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
