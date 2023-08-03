import { LoginRequired } from '@shared/components/authentication/LoginRequired';
import { Modal } from '@shared/components/modal';
import { useUser } from '@shared/hooks/useUser';
import { ChatMessageWithRole } from '@shared/typings';

import { CreateClaim } from './CreateClaim';

interface FlagMessageProps {
  open: boolean;
  close: () => void;
  message: ChatMessageWithRole;
}

export function FlagMessage({ open, close, message }: FlagMessageProps) {
  const { isConnected } = useUser();
  return (
    <Modal
      wrapperWidth={isConnected ? 'max-w-3xl' : 'max-w-xl'}
      open={open}
      close={close}
    >
      {!isConnected && <LoginRequired />}
      {isConnected && <CreateClaim message={message} />}
    </Modal>
  );
}
