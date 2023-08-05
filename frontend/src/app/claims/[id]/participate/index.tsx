import { Button } from '@shared/components/button';
import { ContainerOutlined } from '@shared/components/icons/ContainerOutlined';
import { VerdictInput } from '@shared/components/verdictInput';
import { useAddFactCheck } from '@shared/hooks/useAddFactCheck';
import { useClaimDetails } from '@shared/hooks/useClaimDetails';
import { Evidence, Verdict } from '@shared/typings';
import { useState } from 'react';

import EvidenceForm from './envidence';

export default function Participate() {
  const { claim } = useClaimDetails();
  const [verdict, setVerdict] = useState<Verdict>();
  const [evidence, setEvidence] = useState<Evidence>({});
  const { addFactCheck, loading } = useAddFactCheck(claim.id);

  async function handleCreateFactCheck() {
    if (!verdict || !evidence) return;
    addFactCheck({
      evidence,
      verdict,
    });
  }

  return (
    <div className="mb-20 mt-4 flex flex-col rounded-lg bg-gray-100 p-1">
      <div className="flex flex-col space-y-4 rounded bg-white px-6 py-4">
        <div>
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-50 text-lg text-blue-800">
              <ContainerOutlined />
            </div>
            <div className="text-sm font-medium text-black">Fact Check</div>
          </div>
          <div>
            <p className="mb-6 mt-2 w-6/12 text-xs text-gray-600">
              Your fact check will be used to form consensus around the claim
              mentioned by {claim.source || '-'}. Make sure to investigate the
              best possible
            </p>
          </div>
        </div>
        <VerdictInput verdict={verdict} select={setVerdict} />
        <EvidenceForm evidence={evidence} setEvidence={setEvidence} />
        <div className="w-full space-y-1.5">
          <div className="!mt-4 flex justify-end border-t border-gray-100 pt-4">
            <Button
              loading={loading}
              onClick={handleCreateFactCheck}
              disabled={!evidence.url || !verdict}
              variant="primary"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
