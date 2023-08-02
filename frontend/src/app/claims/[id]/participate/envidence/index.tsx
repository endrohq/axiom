import { Button } from '@shared/components/button';
import { CancelButton } from '@shared/components/button/_CancelButton';
import { ArrowDownOutlined } from '@shared/components/icons/ArrowDownOutlined';
import { FileProtectOutlined } from '@shared/components/icons/FileProtectOutlined';
import InputText from '@shared/components/input/InputText';
import { Evidence } from '@shared/typings';

import EvidenceItem from './EvidenceItem';

interface EvidenceInputProps {
  evidences: Evidence[];
  setEvidences(evidences: Evidence[]): void;
}

export default function EvidenceForm({
  setEvidences,
  evidences,
}: EvidenceInputProps) {
  function handleEvidenceChange(evidence: Evidence, index: number) {
    const newEvidences = [...evidences];
    newEvidences[index] = evidence;
    setEvidences(newEvidences);
  }

  function handleRemove(index: number) {
    const newArray = [...evidences]; // Create a copy of the array
    newArray.splice(index, 1); // Splice the array by index (remove 1 element at the given index)
    setEvidences(newArray); // Update the state with the modified array
  }

  function addEvidence() {
    const newArray = [...evidences];
    newArray.push({});
    setEvidences(newArray);
  }

  return (
    <div className=" w-full space-y-3 py-4">
      <div className="flex items-center">
        <div className="w-full border-b border-gray-100" />
        <div>
          <div className="mx-4 flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
            <ArrowDownOutlined className="text-sm text-gray-600" />
          </div>
        </div>
        <div className="w-full border-b border-gray-100" />
      </div>
      <div className="flex items-center justify-between">
        <div className="w-full space-y-1">
          <div className="flex items-center space-x-2 ">
            <FileProtectOutlined className="text-xl text-gray-700" />
            <div className="text-base font-semibold">Evidence</div>
          </div>
        </div>
        <div>
          <Button
            ghost
            size="small"
            variant="black"
            onClick={addEvidence}
            className="px-2"
          >
            Add Evidence
          </Button>
        </div>
      </div>
      {evidences.map((evidence, index) => (
        <EvidenceItem
          handleRemove={handleRemove}
          evidence={evidence}
          key={index}
          index={index}
          handleEvidenceChange={handleEvidenceChange}
        />
      ))}
    </div>
  );
}
