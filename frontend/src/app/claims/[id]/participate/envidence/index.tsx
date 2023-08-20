import { ArrowDownOutlined } from '@shared/components/icons/ArrowDownOutlined';
import { FileProtectOutlined } from '@shared/components/icons/FileProtectOutlined';
import { Evidence } from '@shared/typings';

import EvidenceItem from './EvidenceItem';

interface EvidenceInputProps {
  evidence: Evidence;
  setEvidence(evidences: Evidence): void;
}

export default function EvidenceForm({
  setEvidence,
  evidence,
}: EvidenceInputProps) {
  return (
    <>
      <div className="flex items-center">
        <div className="w-full border-b border-gray-100" />
        <div>
          <div className="mx-4 flex h-7 w-7 items-center justify-center rounded-full bg-purple-100/70">
            <ArrowDownOutlined className="text-sm text-gray-600" />
          </div>
        </div>
        <div className="w-full border-b border-gray-100" />
      </div>
      <div className="flex items-center justify-between">
        <div className="w-full space-y-1">
          <div className="flex items-center space-x-2 ">
            <FileProtectOutlined className="text-xl text-gray-700" />
            <div className="text-sm font-semibold">Evidence</div>
          </div>
        </div>
      </div>
      <EvidenceItem evidence={evidence} handleEvidenceChange={setEvidence} />
    </>
  );
}
