import { CancelButton } from '@shared/components/button/_CancelButton';
import { PlusCircleOutlined } from '@shared/components/icons/PlusCircleOutlined';
import InputText from '@shared/components/input/InputText';
import TextArea from '@shared/components/input/TextArea';
import { useState } from 'react';
import Select from 'react-select';

const verdictOptions = [
  { value: 'true', label: 'True' },
  { value: 'false', label: 'False' },
  { value: 'unclear', label: 'Unclear' },
];

interface Evidence {
  url: string;
  description: string;
}

export default function FactCheck() {
  const [justification, setJustification] = useState<string>('');
  const [verdict, setVerdict] = useState<string>('');

  const [evidences, setEvidences] = useState<Evidence[]>([]);

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

  return (
    <div className="flex flex-col items-center space-y-6 rounded bg-gray-50 p-6">
      <div className="w-full space-y-1.5">
        <div className="text-sm font-bold text-gray-800">Verdict</div>
        <Select
          value={verdictOptions.find(option => option.value === verdict)}
          onChange={option => option && setVerdict(option.value)}
          options={verdictOptions}
        />
      </div>
      <div className="w-full space-y-1.5">
        <div className="text-sm font-bold text-gray-800">Justification</div>
        <TextArea
          minRows={3}
          value={justification}
          onChange={setJustification}
        />
      </div>
      <div className="w-full space-y-1.5">
        {evidences.map((evidence, index) => (
          <div className=" rounded bg-white p-4" key={index}>
            <div className="flex items-start justify-between">
              <div className="mb-2 text-sm font-bold text-gray-800">
                Evidence #{index + 1}
              </div>
              <CancelButton cancel={() => handleRemove(index)} />
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-full space-y-1.5">
                <label className="text-xs font-semibold" htmlFor="evidence">
                  URL
                </label>
                <InputText
                  onChange={url =>
                    handleEvidenceChange({ ...evidence, url }, index)
                  }
                  value={evidence.url}
                  type="url"
                  id="evidence"
                />
              </div>
              <div className="w-full space-y-1.5">
                <label className="text-xs font-semibold" htmlFor="evidenceDesc">
                  Description (optional)
                </label>
                <InputText
                  onChange={description =>
                    handleEvidenceChange({ ...evidence, description }, index)
                  }
                  value={evidence.description}
                  id="evidenceDesc"
                />
              </div>
            </div>
          </div>
        ))}
        <div
          onClick={() =>
            setEvidences(prevState => [...prevState, {} as Evidence])
          }
          className="!mt-5 flex cursor-pointer items-center justify-center space-x-2 rounded bg-gray-100 px-4 py-2 hover:bg-gray-200"
        >
          <PlusCircleOutlined />
          <div className="text-xs">Add evidence</div>
        </div>
      </div>
      <ul className="mt-6 list-disc rounded border-t border-gray-100 pl-10 pt-6 text-sm">
        <li>
          Each fact-checker researches the claim independently and submits their
          findings, which could include a verdict (true, false, unclear, etc.)
          and a brief justification.
        </li>
        <li>These initial checks are also recorded on the blockchain.</li>
      </ul>
    </div>
  );
}
