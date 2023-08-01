'use client';

import { PageMenu } from '@shared/components/pageMenu';
import { useClaimDetails } from '@shared/hooks/useClaimDetails';
import { MenuItem } from '@shared/typings';
import { ReactNode, useState } from 'react';

import { ClaimDetails } from './ClaimDetails';
import Consensus from './Consensus';
import FactCheck from './factCheck/FactCheck';

import { Header } from './header';
import Overview from './overview';

type MenuId = 'home' | 'fact-check' | 'activities';

const menu: MenuItem<MenuId>[] = [
  {
    id: 'home',
    label: 'Overview',
  },
];

export default function Page() {
  const [activeWindow, setActiveWindow] = useState<MenuId>('home');

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
      {activeWindow === 'home' && <Overview />}
    </>
  );
}
