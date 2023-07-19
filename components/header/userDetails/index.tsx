import { AccountModal } from '@shared/components/header/userDetails/AccountModal';
import { EthAddressIcon } from '@shared/components/icons/EthAddressIcon';
import { Paragraph } from '@shared/components/typography/Paragraph';
import { Hash } from '@shared/typings';
import { isArrayWithElements } from '@shared/utils/array.utils';

import { getShortenedFormat } from '@shared/utils/string.utils';

import { useState } from 'react';

import { useHederaNotifications } from '../../../../context/HederaNotificationProvider';
import { useUser } from '../../../../hooks/useUser';

export function UserDetails() {
  const [showAccountDetails, setShowAccountDetails] = useState<boolean>(false);
  const { messages } = useHederaNotifications();
  const { address } = useUser();
  return (
    <div className="relative">
      <div
        onClick={() => setShowAccountDetails(true)}
        className="flex w-full items-center justify-between space-x-2 rounded bg-third px-4 py-2 brightness-95 transition-all duration-500 hover:brightness-90"
      >
        <EthAddressIcon address={address as Hash} />
        <Paragraph className="text-sm">
          {getShortenedFormat(address, 6)}
        </Paragraph>
      </div>
      {isArrayWithElements(messages?.filter(item => !item.isViewed)) && (
        <div className="absolute -right-1 -top-1 flex items-center justify-center rounded-full bg-red-600 px-1.5 pb-0.5 pt-1 text-[9px] font-bold leading-none text-white">
          {messages?.length}
        </div>
      )}
      {showAccountDetails && (
        <AccountModal close={() => setShowAccountDetails(false)} />
      )}
    </div>
  );
}
