'use client';

import { useEffect, useState } from 'react';

import { Button } from '../components/button';
import { ChatMessage } from '../components/chat/ChatMessage';
import { SendOutlined } from '../components/icons/SendOutlined';
import { useChatGpt } from '../hooks/useChatGpt';
import { useKeyPress } from '../hooks/useKeyPress';
import { ChatMessageWithRole } from '../typings';
import { isArrayWithElements } from '../utils/array.utils';

export default function Page() {
  const [messages, setMessages] = useState<ChatMessageWithRole[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const { getGptResponse } = useChatGpt();
  useKeyPress(() => handleSend(), ['Enter'], [userInput]);

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

  function handleSend() {
    const content = `${userInput}`;
    setMessages(prevState => [
      ...prevState,
      { role: 'user', content, state: 'idle' },
      { role: 'assistant', state: 'loading' },
    ]);
    setUserInput('');
  }

  const inTransit =
    messages?.findIndex(message => message.state === 'loading') !== -1;

  return (
    <div className="flex h-full flex-col items-center justify-center pt-10">
      <div className="h-full w-full overflow-y-auto bg-white">
        {!isArrayWithElements(messages) && (
          <div className="mx-auto flex h-full w-5/12 items-center justify-center space-x-4 text-sm text-gray-400">
            Start a conversation
          </div>
        )}
        {isArrayWithElements(messages) &&
          messages?.map((message, idx) => (
            <ChatMessage key={idx} message={message} />
          ))}
      </div>
      <div className="mt-auto  w-full border-t border-gray-100 bg-gray-50 py-6">
        <div className="mx-auto flex w-5/12 items-center rounded border bg-white px-2 py-1">
          <input
            type="text"
            className=" w-full rounded border-none bg-transparent px-2 py-2.5 outline-none"
            value={userInput}
            placeholder="Send a message"
            disabled={inTransit}
            onChange={e => setUserInput(e.target.value)}
          />
          <Button
            loading={inTransit}
            className="leading-none"
            ghost={userInput.length === 0}
            icon={<SendOutlined className="text-lg leading-none" />}
            variant="primary"
            onClick={handleSend}
          />
        </div>
      </div>
    </div>
  );
}
