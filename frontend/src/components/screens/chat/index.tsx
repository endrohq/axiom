'use client';

import { useChatGpt } from '@shared/hooks/useChatGpt';
import { ChatMessageWithRole } from '@shared/typings';

import { isArrayWithElements } from '@shared/utils/array.utils';
import { useEffect, useState } from 'react';

import { ChatInput } from './ChatInput';

import { ChatMessage } from './ChatMessage';
import { FlagMessage } from './flagMessage';

export default function ChatUI() {
  const [messages, setMessages] = useState<ChatMessageWithRole[]>([]);
  const { getGptResponse } = useChatGpt();
  const [flagMessage, setFlagMessage] = useState<ChatMessageWithRole>();

  useEffect(() => {
    const shouldQuery = messages?.findIndex(
      item => item.state === 'loading' && item.role === 'assistant',
    );
    if (shouldQuery !== -1) {
      const userMessage = messages?.[shouldQuery - 1]?.content;
      if (userMessage) handleFetchResponse(userMessage, shouldQuery);
    }
  }, [messages]);

  async function handleFetchResponse(message: string, indexOfAnswer: number) {
    try {
      const answer = await getGptResponse(message);
      if (answer?.choices?.[0]) {
        setMessages(prevState =>
          prevState?.map((item, index) => {
            if (index !== indexOfAnswer) return item;
            return {
              ...prevState[indexOfAnswer],
              content: answer.choices?.[0]?.message.content,
              state: 'success',
            };
          }),
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSend(message: string) {
    const content = `${message}`;
    setMessages(prevState => [
      ...prevState,
      { role: 'user', content, state: 'idle' },
      { role: 'assistant', state: 'loading' },
    ]);
  }

  const inTransit =
    messages?.findIndex(message => message.state === 'loading') !== -1;

  return (
    <>
      <div className="flex h-full flex-col items-center justify-center pt-10">
        <div className="h-full w-full overflow-y-auto bg-white">
          {!isArrayWithElements(messages) && (
            <div className="mx-auto flex h-full w-5/12 items-center justify-center space-x-4 text-sm text-gray-400">
              Start a conversation
            </div>
          )}
          {isArrayWithElements(messages) &&
            messages?.map((message, idx) => (
              <ChatMessage
                key={idx}
                message={message}
                onFlagMessage={() => setFlagMessage(message)}
              />
            ))}
        </div>
        <ChatInput handleSend={handleSend} loading={inTransit} />
      </div>
      {flagMessage && (
        <FlagMessage
          open={!!flagMessage}
          close={() => setFlagMessage(undefined)}
          message={flagMessage}
        />
      )}
    </>
  );
}
