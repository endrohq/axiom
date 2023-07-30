'use client';

import { Button } from '@shared/components/button';
import { AccountModal } from '@shared/components/header/userDetails/AccountModal';
import { EthAddressIcon } from '@shared/components/icons/EthAddressIcon';

import { useUser } from '@shared/hooks/useUser';
import { getShortenedFormat } from '@shared/utils/string.utils';

import { useState } from 'react';

export default function UserDetails() {
  const [showAccountDetails, setShowAccountDetails] = useState<boolean>(false);
  const { address, login } = useUser();

  if (!address) {
    return (
      <Button onClick={() => login()} variant="primary">
        Connect
      </Button>
    );
  }
  return (
    <div className="relative">
      <div
        onClick={() => setShowAccountDetails(true)}
        className="flex w-full items-center justify-between space-x-2 rounded bg-gray-400/20 px-4 py-2 transition-all duration-500 hover:bg-gray-200/20"
      >
        <EthAddressIcon address={address} />
        <p className="text-sm text-gray-100">
          {getShortenedFormat(address, 6)}
        </p>
      </div>
      {showAccountDetails && (
        <AccountModal close={() => setShowAccountDetails(false)} />
      )}
    </div>
  );
}
