'use client';

import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';
import { PageMenu } from '@shared/components/pageMenu';
import { useClaim } from '@shared/hooks/useClaim';
import { MenuItem } from '@shared/typings';
import { useState } from 'react';

import { ClaimDetails } from './ClaimDetails';
import Consensus from './Consensus';
import FactCheck from './factCheck/FactCheck';

import { Header } from './Header';
import JoinClaim from './JoinClaim';

type MenuId = 'home' | 'fact-check' | 'consensus';

const menu: MenuItem<MenuId>[] = [
  {
    id: 'home',
    label: 'Home',
  },
  {
    id: 'fact-check',
    label: 'Fact Check',
  },
  {
    id: 'consensus',
    label: 'Consensus',
  },
];

export default function Page({ params }: { params: { id: string } }) {
  const [activeWindow, setActiveWindow] = useState<MenuId>('home');
  const [participants, setParticipants] = useState<string[]>([]);

  const { claim, loading } = useClaim(params.id);

  if (loading || !claim) {
    return (
      <div className="mx-auto mt-10 w-1/2">
        {loading ? (
          <LoadingOutlined />
        ) : (
          <div className="text-sm">Claim not found</div>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 w-1/2">
      <Header claim={claim} />
      <ClaimDetails claim={claim} />
      <PageMenu
        className="mb-4 mt-10"
        menu={menu}
        onClick={setActiveWindow}
        activeItem={activeWindow}
      />
      {activeWindow === 'home' ? (
        <JoinClaim
          claim={claim}
          participants={participants}
          setParticipants={setParticipants}
          onSuccess={() => setActiveWindow('fact-check')}
        />
      ) : activeWindow === 'fact-check' ? (
        <FactCheck />
      ) : (
        <Consensus />
      )}
    </div>
  );
}
