import { NotificationItem } from '@shared/components/header/userDetails/NotificationItem';
import { EthAddressIcon } from '@shared/components/icons/EthAddressIcon';
import { LogoutOutlined } from '@shared/components/icons/LogoutOutlined';
import { Modal } from '@shared/components/modal';

import { Paragraph } from '@shared/components/typography/Paragraph';
import { Hash } from '@shared/typings';
import { isArrayWithElements } from '@shared/utils/array.utils';
import { getShortenedFormat } from '@shared/utils/string.utils';

import { useEffect } from 'react';

import { useHederaNotifications } from '../../../../context/HederaNotificationProvider';
import { useUser } from '../../../../hooks/useUser';

interface AccountModalProps {
  close: () => void;
}

export function AccountModal({ close }: AccountModalProps) {
  const { address, logout } = useUser();
  const { messages, setHasViewed } = useHederaNotifications();

  function handleLogout() {
    logout();
    close();
  }

  useEffect(() => {
    return () => {
      setHasViewed();
    };
  }, []);

  return (
    <>
      {address && (
        <Modal position="right" close={close} open={true}>
          <div className="mb-8 flex items-center justify-between">
            <div className="bg-transition flex items-center space-x-2 rounded py-2">
              <EthAddressIcon size="large" address={address as Hash} />
              <Paragraph className="">
                {getShortenedFormat(address, 6)}
              </Paragraph>
            </div>
            <div>
              <div
                onClick={handleLogout}
                className="bg-transition cursor-pointer rounded bg-gray-100 px-2 py-1.5 hover:bg-gray-200"
              >
                <LogoutOutlined className="text-lg text-gray-600" />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-5">
            {isArrayWithElements(messages) ? (
              messages.map((message, index) => (
                <NotificationItem message={message} key={index} />
              ))
            ) : (
              <div className="text-sm text-gray-500">No notifications</div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
