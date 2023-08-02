import { Button } from '@shared/components/button';
import { ContainerOutlined } from '@shared/components/icons/ContainerOutlined';
import { useClaimDetails } from '@shared/hooks/useClaimDetails';
import { Evidence } from '@shared/typings';
import { useState } from 'react';

import EvidenceForm from './envidence';
import { VerdictInput } from './VerdictInput';

export default function Participate() {
  const { claim } = useClaimDetails();
  const [verdict, setVerdict] = useState<string>('');

  const [evidences, setEvidences] = useState<Evidence[]>([{}]);

  return (
    <div className="mt-4 flex flex-col rounded-lg bg-gray-100 p-1">
      <div className="flex flex-col rounded bg-white px-6 py-4">
        <div className=" flex items-center space-x-2 border-b border-gray-100 pb-2">
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
        <VerdictInput verdict={verdict} select={setVerdict} />
        <EvidenceForm evidences={evidences} setEvidences={setEvidences} />
        <div className="w-full space-y-1.5">
          <div className="!mt-4 flex justify-end border-t border-gray-100 pt-4">
            <Button variant="primary">Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
