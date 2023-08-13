import { Button } from '@shared/components/button';
import { Topic } from '@shared/components/topics/Topic';
import { VerdictInput } from '@shared/components/verdictInput';
import { useAnalyseMessage } from '@shared/hooks/useAnalyseMessage';
import { useCreateClaim } from '@shared/hooks/useCreateClaim';
import { ChatMessageWithRole, NlpTopic, Verdict } from '@shared/typings';
import { getClaimItemRoute } from '@shared/utils/route.utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AnalyseMessageProps {
  message: ChatMessageWithRole;
}

export function CreateClaim({ message }: AnalyseMessageProps) {
  const { analysis, analyse, loading } = useAnalyseMessage();
  const { createClaim, loading: isCreatingClaim, claimId } = useCreateClaim();
  const [assumption, setAssumption] = useState<Verdict>();

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
        assumption,
        topics: analysis?.topics,
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
              {analysis?.topics?.map((topic: NlpTopic, index: number) => (
                <Topic topic={topic} key={index} />
              ))}
            </div>
          )}
        </div>
        <VerdictInput
          verdict={assumption}
          select={setAssumption}
          description="Why do think that this message should be flagged?"
        />
        <div className="mt-5 flex w-full justify-end border-t border-gray-100 pt-5">
          <Button
            loading={isCreatingClaim}
            disabled={loading || !assumption}
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
