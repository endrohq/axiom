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
  const { analysis } = useAnalyseMessage();
  const { createClaim, loading: isCreatingClaim, claimId } = useCreateClaim();
  const [assumption, setAssumption] = useState<Verdict>();

  const router = useRouter();

  useEffect(() => {
    if (claimId) router.push(getClaimItemRoute(claimId));
  }, [claimId]);

  function handleCreate() {
    if (message.content)
      createClaim({
        claim: message.content,
        origin: 'ChatGPT API',
        assumption,
        topics: analysis?.topics,
      });
  }

  return (
    <div>
      <div className="mb-1 text-lg font-medium">
        You're about to flag a message
      </div>
      <div className="mb-6 w-10/12 text-xs text-gray-600">
        Flagging a message will create a claim where participants can vote if
        you assumption is correct or not. Make sure to check the claim before
        flagging as this will directly impact your reputation on Axiom.
      </div>
      <div className="flex flex-col items-start space-y-8">
        <div className="w-full rounded border border-dashed border-purple-200 bg-purple-50/50 p-4 text-xs font-medium leading-relaxed text-purple-900">
          {message.content}
        </div>
        <VerdictInput
          verdict={assumption}
          select={setAssumption}
          title="Is the claim true, false or unverifiable?"
          description="We will include your assumption in the claim."
        />
        <div className="mt-3 flex w-full justify-end border-t border-gray-100 pt-5">
          <Button
            loading={isCreatingClaim}
            disabled={assumption === undefined}
            onClick={handleCreate}
            variant="primary"
          >
            Flag
          </Button>
        </div>
      </div>
    </div>
  );
}
