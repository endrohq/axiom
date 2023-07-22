import { Button } from '@shared/components/button';
import { ChatMessageWithRole } from '@shared/typings';

interface AnalyseMessageProps {
  message: ChatMessageWithRole;
}

export function AnalyseMessage({ message }: AnalyseMessageProps) {
  return (
    <div>
      <div className="mb-4 truncate whitespace-nowrap rounded bg-gray-50 p-2 text-xs">
        {message.content}
      </div>
      <h6 className="text-sm font-medium">Analyse message</h6>
      <p className="mb-4 w-9/12 text-sm text-gray-700">
        We'll need to analyse the message for topics to optimise our system.
      </p>
      <Button size="small" className="font-medium" variant="primary">
        Analyse
      </Button>
    </div>
  );
}
