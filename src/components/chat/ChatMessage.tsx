import { FlagOutlined } from '@shared/components/icons/FlagOutlined';
import clsx from 'clsx';

import { ChatMessageWithRole } from '../../typings';
import { ChatGptLogoFilled } from '../icons/ChatGptLogoFilled';
import { EthAddressIcon } from '../icons/EthAddressIcon';
import { LoadingOutlined } from '../icons/LoadingOutlined';

interface ChatMessageProps {
  message: ChatMessageWithRole;
  onFlagMessage(): void;
}

export function ChatMessage({ message, onFlagMessage }: ChatMessageProps) {
  return (
    <div
      className={clsx(
        'border-b border-gray-100 py-6',
        message.role !== 'user' ? 'bg-gray-50' : 'bg-white',
      )}
    >
      <div className="mx-auto mb-4 flex w-5/12 items-start justify-between space-x-6">
        <div className="flex items-start space-x-6">
          <div className="rounded-full bg-gray-200">
            {message.role === 'assistant' ? (
              <ChatGptLogoFilled className="h-6 w-6" />
            ) : (
              <EthAddressIcon
                size="medium"
                address="0x07A5c395F6B7c79E56252BD99db9ad14d81B2Fc6"
              />
            )}
          </div>

          {message.state === 'loading' ? (
            <LoadingOutlined />
          ) : (
            <p className="text-sm leading-relaxed text-gray-800">
              {message.content}
            </p>
          )}
        </div>
        {message.role === 'assistant' && (
          <div className="ml-auto">
            <FlagOutlined
              onClick={() => onFlagMessage()}
              className="cursor-pointer text-xl text-gray-400 hover:text-primary"
            />
          </div>
        )}
      </div>
    </div>
  );
}
