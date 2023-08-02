'use client';

import { PageMenu } from '@shared/components/pageMenu';
import { useClaimDetails } from '@shared/hooks/useClaimDetails';
import { useUser } from '@shared/hooks/useUser';
import { MenuItem } from '@shared/typings';
import { useState } from 'react';

import { ClaimDetails } from './ClaimDetails';

import { Header } from './header';
import Overview from './overview';
import Participate from './participate';

type MenuId = 'home' | 'participate' | 'activities';

const menu: MenuItem<MenuId>[] = [
  {
    id: 'home',
    label: 'Overview',
  },
];

export default function Page() {
  const [activeWindow, setActiveWindow] = useState<MenuId>('home');
  const { claim } = useClaimDetails();
  const { address } = useUser();

  const isParticipating = claim?.factCheckers?.find(
    factChecker =>
      factChecker.factCheckerAddress?.toLowerCase() === address?.toLowerCase(),
  );

  return (
    <>
      <Header />
      <ClaimDetails />
      <PageMenu
        className="mt-10"
        menu={menu}
        onClick={setActiveWindow}
        activeItem={activeWindow}
      />
      {isParticipating && <Participate />}
      {activeWindow === 'home' && !isParticipating && <Overview />}
    </>
  );
}
