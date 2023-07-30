import { Button } from '@shared/components/button';
import { ChatMessageWithRole } from '@shared/typings';
import { useState } from 'react';

interface AnalyseMessageProps {
  message: ChatMessageWithRole;
}

export function AnalyseMessage({ message }: AnalyseMessageProps) {
  const [data, setData] = useState();
  async function handleAnalyse() {
    try {
      const response = await fetch('http://localhost:8080/extract_topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: message.content }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(
        'There has been a problem with your fetch operation:',
        error,
      );
    }
  }

  return (
    <div className="flex items-start space-x-10">
      <div className="mb-4 w-1/2 rounded bg-gray-50 p-6 text-xs leading-relaxed text-gray-500">
        {message.content}
      </div>
      <div className="mt-2 w-1/2">
        <h6 className="text-sm font-medium">Analyse message</h6>
        <p className="w-9/12 text-xs text-gray-700">
          We'll need to analyse the message for topics to optimise our system.
        </p>
        {data && (
          <div className="mt-4 text-xs text-gray-700">
            {JSON.stringify(data, null, 2)}
          </div>
        )}
        <div className="mt-5 border-t border-gray-100 pt-5">
          <Button
            onClick={handleAnalyse}
            size="small"
            className=""
            variant="primary"
          >
            Analyse
          </Button>
        </div>
      </div>
    </div>
  );
}
