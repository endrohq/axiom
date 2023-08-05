import { Button } from '@shared/components/button';
import { VerdictInput } from '@shared/components/verdictInput';
import { useAnalyseMessage } from '@shared/hooks/useAnalyseMessage';
import { useCreateClaim } from '@shared/hooks/useCreateClaim';
import { ChatMessageWithRole, Verdict } from '@shared/typings';
import { getClaimItemRoute } from '@shared/utils/route.utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AnalyseMessageProps {
  message: ChatMessageWithRole;
}

export function CreateClaim({ message }: AnalyseMessageProps) {
  const { analysis, analyse, loading } = useAnalyseMessage();
  const { createClaim, loading: isCreatingClaim, claimId } = useCreateClaim();
  const [verdict, setVerdict] = useState<Verdict>();

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
        verdict,
      });
  }

  return (
    <div>
      <div className="mb-2 text-base font-medium">Flagging Message</div>
      <div className="flex flex-col items-start">
        <div className="w-full rounded bg-gray-50 p-6 text-xs leading-relaxed text-gray-500">
          {message.content}
        </div>
        <div className="mb-6 mt-2 w-1/2 border-l border-gray-100 pl-4">
          <h6 className="text-sm font-medium">Analysis</h6>
          {analysis && (
            <div className="mt-2 flex flex-wrap gap-1">
              {
                analysis?.topics?.map((topic: string) => (
                  <div
                    className="rounded bg-blue-50 px-1 py-0.5 text-[10px] text-blue-700"
                    key={topic}
                  >
                    {topic}
                  </div>
                )) as any
              }
            </div>
          )}
        </div>
        <VerdictInput
          verdict={verdict}
          select={setVerdict}
          description="Why do think that this message should be flagged?"
        />
        <div className="mt-5 flex w-full justify-end border-t border-gray-100 pt-5">
          <Button
            loading={isCreatingClaim}
            disabled={loading || !verdict}
            onClick={handleCreate}
            className=""
            variant="primary"
          >
            Flag
          </Button>
        </div>
      </div>
    </div>
  );
}
