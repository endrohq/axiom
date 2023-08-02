import { Button } from '@shared/components/button';
import { useAnalyseMessage } from '@shared/hooks/useAnalyseMessage';
import { useCreateClaim } from '@shared/hooks/useCreateClaim';
import { ChatMessageWithRole } from '@shared/typings';
import { getClaimItemRoute } from '@shared/utils/route.utils';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AnalyseMessageProps {
  message: ChatMessageWithRole;
}

export function CreateClaim({ message }: AnalyseMessageProps) {
  const { analysis, analyse, loading } = useAnalyseMessage();
  const { createClaim, loading: isCreatingClaim, claimId } = useCreateClaim();

  const router = useRouter();

  useEffect(() => {
    if (claimId) router.push(getClaimItemRoute(claimId));
  }, [claimId]);

  useEffect(() => {
    if (message.content) analyse(message.content);
  }, [message]);

  function handleCreate() {
    if (message.content)
      createClaim({
        claim: message.content,
        source: 'ChatGPT API',
      });
  }

  return (
    <div className="flex flex-col items-start">
      <div className="mb-4 w-full rounded bg-gray-50 p-6 text-xs leading-relaxed text-gray-500">
        {message.content}
      </div>
      <div className="mt-2 w-1/2">
        <h6 className="text-sm font-medium">Analyse message</h6>
        <p className="w-9/12 text-xs text-gray-700">
          We'll need to analyse the message for topics to optimise our system.
        </p>
        {analysis && (
          <div className="mt-4 text-xs text-gray-700">
            {JSON.stringify(analysis, null, 2)}
          </div>
        )}
      </div>
      <div className="mt-5 flex w-full justify-end border-t border-gray-100 pt-5">
        <Button
          loading={isCreatingClaim}
          disabled={loading}
          onClick={handleCreate}
          className=""
          variant="primary"
        >
          Flag
        </Button>
      </div>
    </div>
  );
}
