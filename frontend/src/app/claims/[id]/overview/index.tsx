'use client';

import { maxFactCheckersCount } from '@env';
import { Badge } from '@shared/components/badge';
import { Button } from '@shared/components/button';
import { EthAddressIcon } from '@shared/components/icons/EthAddressIcon';
import { TeamOutlined } from '@shared/components/icons/TeamOutlined';
import { useClaimDetails } from '@shared/hooks/useClaimDetails';
import { useUser } from '@shared/hooks/useUser';
import { getShortenedFormat } from '@shared/utils/string.utils';
import clsx from 'clsx';
import { useState } from 'react';

import { ParticipateModal } from './ParticipateModal';

export default function Overview() {
  const { claim } = useClaimDetails();
  const { isConnected } = useUser();
  const [intentionToJoin, setIntentionToJoin] = useState<boolean>(false);

  if (!claim) return <div className="text-sm">Claim not found</div>;
  return (
    <>
      <div className="flex flex-col rounded bg-gray-50">
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <div className="flex items-center space-x-2">
            <div className="text-xl text-black">
              <TeamOutlined />
            </div>
            <div className="mt-1 text-sm font-medium">Participants</div>
          </div>
          {isConnected && (
            <Button
              disabled={
                (claim?.factCheckers?.length || 0) >= maxFactCheckersCount
              }
              variant="primary"
              size="small"
              onClick={() => setIntentionToJoin(true)}
            >
              Participate
            </Button>
          )}
        </div>
        {claim?.factCheckers?.map((item, idx) => (
          <div
            key={idx}
            className={clsx(
              'flex items-center space-x-3 border-b border-gray-100 p-4',
              idx % 2 === 0 && 'bg-white',
            )}
          >
            <EthAddressIcon size="medium" address={item.factCheckerAddress} />
            <div className="text-xs text-gray-700">
              {getShortenedFormat(item.factCheckerAddress, 14)}
            </div>
            <div>
              <Badge label={item.status} color="dark" />
            </div>
          </div>
        ))}
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
