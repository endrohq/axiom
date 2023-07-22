import { Button } from '@shared/components/button';
import { AnalyseMessage } from '@shared/components/flagMessage/AnalyseMessage';
import { Modal } from '@shared/components/modal';
import { ChatMessageWithRole } from '@shared/typings';

import { useUser } from '../../hooks/useUser';

interface FlagMessageProps {
  open: boolean;
  close: () => void;
  message: ChatMessageWithRole;
}

export function FlagMessage({ open, close, message }: FlagMessageProps) {
  const { isConnected, login } = useUser();
  return (
    <Modal open={open} close={close}>
      {!isConnected && (
        <div className="flex flex-col items-center justify-center space-y-10 py-12">
          <p className="text-center text-gray-800">
            You need to connect your wallet to flag a message.
          </p>
          <Button onClick={login} variant="primary">
            Login
          </Button>
        </div>
      )}
      {isConnected && <AnalyseMessage message={message} />}
    </Modal>
  );
}
