import { Button } from '@shared/components/button';
import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';
import { SendOutlined } from '@shared/components/icons/SendOutlined';

import { useState } from 'react';

import { useSnap } from '../../snap/useSnap';

interface SelectedTextProps {
  textSelected: string;
}

export default function SelectedText({ textSelected }: SelectedTextProps) {
  const { api } = useSnap();
  const [isFlagging, setIsFlagging] = useState(false);

  async function handleCreate() {
    await setIsFlagging(true);
    await api?.createClaim(textSelected);
  }

  return (
    <div className=" fixed bottom-4 right-4 w-96 rounded-lg border border-dashed border-purple-300 bg-purple-50 px-4 py-3 shadow">
      <div className="mb-2 text-sm font-medium ">Flag Claim</div>
      <div className="flex items-center justify-between space-x-2">
        <div className="w-10/12 rounded bg-white p-2">
          <p className="truncate whitespace-nowrap text-xs font-medium leading-relaxed text-gray-600">
            {textSelected}
          </p>
        </div>
        <div>
          <Button
            loading={isFlagging}
            onClick={handleCreate}
            icon={isFlagging ? <LoadingOutlined /> : <SendOutlined />}
            variant="primary"
          />
        </div>
      </div>
    </div>
  );
}
