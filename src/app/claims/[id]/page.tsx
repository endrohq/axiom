'use client';

import { LeftOutlined } from '@shared/components/icons/LeftOutlined';
import { RightOutlined } from '@shared/components/icons/RightOutlined';
import { useState } from 'react';

import Consensus from './Consensus';
import FactCheck from './FactCheck';

import JoinClaim from './JoinClaim';

import { useClaims } from '../../../hooks/useClaims';

export default function Page({ params }: { params: { id: string } }) {
  const [activeWindow, setActiveWindow] = useState(0);
  const [participants, setParticipants] = useState<string[]>([]);

  const { claims } = useClaims();

  const claim = claims.find(claim => claim.id === params.id);
  return (
    <div className="mx-auto mt-20 w-1/2">
      <div>
        <div className="text-sm text-gray-700">
          <span className="font-bold">{claim?.source}</span> mentioned following
          claim:
        </div>
        <p className="mt-2 rounded bg-gray-50 p-4 text-sm text-gray-500">
          {claim?.claim}
        </p>
        <div className="my-4 flex items-center space-x-1">
          <div
            onClick={() =>
              setActiveWindow(prevState =>
                prevState > -1 ? prevState - 1 : prevState,
              )
            }
            className="bg-transition cursor-pointer rounded-full bg-gray-100 px-2.5 py-2 text-xs hover:bg-gray-200"
          >
            <LeftOutlined />
          </div>
          <div
            onClick={() =>
              setActiveWindow(prevState =>
                prevState < 3 ? prevState + 1 : prevState,
              )
            }
            className="bg-transition cursor-pointer rounded-full bg-gray-100 px-2.5 py-2 text-xs hover:bg-gray-200"
          >
            <RightOutlined />
          </div>
        </div>
      </div>
      {activeWindow === 0 ? (
        <JoinClaim
          participants={participants}
          setParticipants={setParticipants}
          onSuccess={() => setActiveWindow(1)}
        />
      ) : activeWindow === 1 ? (
        <FactCheck />
      ) : (
        <Consensus />
      )}
    </div>
  );
}
