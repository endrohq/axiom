import clsx from 'clsx';

import { ChatMessageWithRole } from '../../typings';
import { ChatGptLogoFilled } from '../icons/ChatGptLogoFilled';
import { EthAddressIcon } from '../icons/EthAddressIcon';
import { LoadingOutlined } from '../icons/LoadingOutlined';

interface ChatMessageProps {
  message: ChatMessageWithRole;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={clsx(
        'border-b border-gray-100 py-6',
        message.role !== 'user' ? 'bg-gray-50' : 'bg-white',
      )}
    >
      <div className="mx-auto mb-4 flex w-5/12 items-start space-x-10">
        <div className="rounded-full bg-gray-200">
          {message.role === 'assistant' ? (
            <ChatGptLogoFilled className="h-10 w-10" />
          ) : (
            <EthAddressIcon
              size="large"
              address="0x07A5c395F6B7c79E56252BD99db9ad14d81B2Fc6"
            />
          )}
        </div>

        {message.state === 'loading' ? (
          <LoadingOutlined />
        ) : (
          <p className="leading-relaxed">{message.content}</p>
        )}
      </div>
    </div>
  );
}
