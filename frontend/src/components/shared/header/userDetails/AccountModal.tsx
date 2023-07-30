import { EthAddressIcon } from '@shared/components/icons/EthAddressIcon';
import { LogoutOutlined } from '@shared/components/icons/LogoutOutlined';
import { Modal } from '@shared/components/modal';

import { useUser } from '@shared/hooks/useUser';
import { getShortenedFormat } from '@shared/utils/string.utils';

interface AccountModalProps {
  close: () => void;
}

export function AccountModal({ close }: AccountModalProps) {
  const { address, logout } = useUser();

  function handleLogout() {
    logout();
    close();
  }

  return (
    <>
      {address && (
        <Modal position="right" close={close} open={true}>
          <div className="mb-8 flex items-center justify-between">
            <div className="bg-transition flex items-center space-x-2 rounded py-2">
              <EthAddressIcon size="large" address={address} />
              <p>{getShortenedFormat(address, 6)}</p>
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
          <div className="border-t border-gray-100 pt-5">Lorem Ipsum</div>
        </Modal>
      )}
    </>
  );
}
