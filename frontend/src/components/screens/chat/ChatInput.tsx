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
    <div className="mt-auto w-full border-t border-gray-100 bg-gray-50 py-6">
      <div className="mx-auto flex w-5/12 items-center rounded border bg-white px-2 py-1">
        <input
          type="text"
          className=" w-full rounded border-none bg-transparent px-2 py-2.5 outline-none"
          value={userInput}
          placeholder="Send a message"
          disabled={loading}
          onChange={e => setUserInput(e.target.value)}
        />
        <Button
          loading={loading}
          className="leading-none"
          ghost={userInput.length === 0}
          icon={<SendOutlined className="text-lg leading-none" />}
          variant="primary"
          onClick={() => handleSubmit()}
        />
      </div>
    </div>
  );
}
