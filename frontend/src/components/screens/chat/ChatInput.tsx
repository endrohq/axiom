import { Button } from '@shared/components/button';
import { SendOutlined } from '@shared/components/icons/SendOutlined';
import { useKeyPress } from '@shared/hooks/useKeyPress';
import { useState } from 'react';

interface ChatInputProps {
  handleSend: (message: string) => Promise<void>;
  loading: boolean;
}

export function ChatInput({ handleSend, loading }: ChatInputProps) {
  const [userInput, setUserInput] = useState<string>('');
  useKeyPress(() => handleSubmit(), ['Enter'], [userInput]);

  async function handleSubmit() {
    await handleSend(`${userInput}`);
    setUserInput('');
  }

  return (
    <div className="mt-auto flex w-full items-center justify-center space-x-2 py-4">
      <div className="flex w-5/12 items-center rounded border bg-gray-100 px-4 py-0.5">
        <input
          type="text"
          className=" w-full rounded-full border-none bg-transparent px-2 py-2.5 text-base outline-none"
          value={userInput}
          placeholder="Send a message"
          disabled={loading}
          onChange={e => setUserInput(e.target.value)}
        />
      </div>
      <div className="">
        <Button
          loading={loading}
          className=""
          ghost={userInput.length === 0}
          icon={<SendOutlined className="text-lg leading-none" />}
          variant="primary"
          size="large"
          onClick={() => userInput.length > 2 && handleSubmit()}
        />
      </div>
    </div>
  );
}
