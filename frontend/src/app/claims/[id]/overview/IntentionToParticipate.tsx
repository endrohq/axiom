'use client';

import { maxFactCheckersCount } from '@env';
import { Button } from '@shared/components/button';
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
        {canParticipate ? (
          <Button
            onClick={() => setIntentionToJoin(true)}
            className="w-full py-1"
            icon={<PlusOutlined />}
            variant="primary"
            disabled={intentionToJoin}
          >
            Join Fact Check
          </Button>
        ) : (
          <div className="flex items-center justify-center space-x-2 py-4 text-sm">
            <span>🎉</span>
            <span className="text-gray-500">Already Participating</span>
          </div>
        )}
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
