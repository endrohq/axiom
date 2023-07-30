import { Button } from '@shared/components/button';
import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';
import { TeamOutlined } from '@shared/components/icons/TeamOutlined';
import { Claim } from '@shared/typings';
import { useEffect, useState } from 'react';

import { ClaimDetails } from './ClaimDetails';

const POOL_PARTICIPANTS_AMOUNT = 2;

interface JoinClaimProps {
  onSuccess(): void;
  participants: string[];
  setParticipants(participants: string[]): void;
  claim: Claim;
}

export default function JoinClaim({
  onSuccess,
  setParticipants,
  participants,
  claim,
}: JoinClaimProps) {
  const [onSuccessLoading, setOnSuccessLoading] = useState(false);

  useEffect(() => {
    if (onSuccessLoading && participants?.length >= POOL_PARTICIPANTS_AMOUNT) {
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }
  }, [onSuccessLoading, participants]);

  useEffect(() => {
    if (participants?.length >= POOL_PARTICIPANTS_AMOUNT) {
      setOnSuccessLoading(true);
    }
  }, [participants]);

  function handleJoinPool() {
    if (participants?.length >= POOL_PARTICIPANTS_AMOUNT) return;
    const newParticipants = [...participants];
    newParticipants.push('');
    setParticipants(newParticipants);
  }

  return (
    <>
      <div className="w-5/12"></div>
      <div className="mt-6 flex flex-col items-center space-y-6 rounded border-t border-gray-100 bg-gray-50 p-6">
        <div className="">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl text-gray-300">
            {onSuccessLoading ? <LoadingOutlined /> : <TeamOutlined />}
          </div>
        </div>
        <div className="h-1.5 w-full rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-primary"
            style={{
              width: `${
                (100 / POOL_PARTICIPANTS_AMOUNT) * participants.length
              }%`,
            }}
          ></div>
        </div>
        <Button
          disabled={onSuccessLoading}
          variant="primary"
          onClick={handleJoinPool}
        >
          Join Pool
        </Button>
        <ul className="mt-6 list-disc rounded text-sm">
          <li>
            Once the claim is created, an initial group of fact-checkers is
            assigned to check it.
          </li>
          <li>
            Fact-checkers could be assigned randomly, or based on reputation
            scores, availability, or other factors.
          </li>
        </ul>
      </div>
    </>
  );
}
