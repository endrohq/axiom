'use client';

import { Badge } from '@shared/components/badge';
import { ArrowDownOutlined } from '@shared/components/icons/ArrowDownOutlined';
import { EthAddressIcon } from '@shared/components/icons/EthAddressIcon';
import { useIpfs } from '@shared/hooks/useIpfs';
import { FactChecker } from '@shared/typings';
import { getShortenedFormat } from '@shared/utils/string.utils';
import { useEffect, useState } from 'react';

interface FactCheckItemProps {
  factCheck: FactChecker;
  idx: number;
}

export default function FactCheckItem({ factCheck }: FactCheckItemProps) {
  const [ipfsData, setIpfsData] = useState<any>();
  const [expanded, _] = useState<boolean>(false);
  const { readFile } = useIpfs();

  useEffect(() => {
    async function fetchIpfsData() {
      const response = await readFile(factCheck.cid);
      setIpfsData(response);
    }
    if (factCheck.cid) {
      fetchIpfsData();
    }
  }, [factCheck.cid]);

  return (
    <>
      <div className=" bg-transition flex cursor-pointer items-center justify-between rounded bg-gray-50 p-4 hover:bg-gray-100">
        <div className="flex items-center space-x-3">
          <EthAddressIcon size="medium" address={factCheck.factChecker} />
          <div className="text-xs text-gray-700">
            {getShortenedFormat(factCheck.factChecker, 14)}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div>
            <Badge label={factCheck.status} color="dark" />
          </div>
          <div className="rounded bg-gray-50 px-2 py-1 text-sm">
            <ArrowDownOutlined />
          </div>
        </div>
      </div>

      {expanded && (
        <div className="mt-2 border-t border-gray-100 pt-3 text-sm">
          <div>{ipfsData.verdict}</div>
          <div>{ipfsData.evidence.title}</div>
          <div>{ipfsData.evidence.description}</div>
          <div>{ipfsData.evidence.url}</div>
        </div>
      )}
    </>
  );
}
