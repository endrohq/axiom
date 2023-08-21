'use client';

import { ArrowDownOutlined } from '@shared/components/icons/ArrowDownOutlined';
import { CheckCircleOutlined } from '@shared/components/icons/CheckCircleOutlined';
import { CloseOutlined } from '@shared/components/icons/CloseOutlined';
import { EthAddressIcon } from '@shared/components/icons/EthAddressIcon';
import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';
import { MinusCircleOutlined } from '@shared/components/icons/MinusCircleOutlined';
import { useIpfs } from '@shared/hooks/useIpfs';
import { FactChecker, FactCheckerIpfsData } from '@shared/typings';
import { getShortenedFormat } from '@shared/utils/string.utils';

import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { FactCheckRow } from './FactCheckRow';

interface FactCheckItemProps {
  factCheck: FactChecker;
  idx: number;
}

export default function Index({ factCheck }: FactCheckItemProps) {
  const [ipfsData, setIpfsData] = useState<FactCheckerIpfsData>();
  const [expanded, setExpanded] = useState<boolean>(false);
  const { readFile } = useIpfs();

  useEffect(() => {
    async function fetchIpfsData() {
      const response = await readFile<FactCheckerIpfsData>(factCheck.cid);
      setIpfsData(response);
    }
    if (factCheck.cid) {
      fetchIpfsData();
    }
  }, [factCheck.cid]);

  return (
    <div className="bg-transition rounded border border-dashed border-purple-300 bg-gray-50 p-4">
      <div className="flex items-center justify-between ">
        <div className="flex items-center space-x-3">
          <EthAddressIcon size="large" address={factCheck.factChecker} />
          <div>
            <div className="text-xs text-gray-600">Fact check by</div>
            <div className="text-xs text-gray-800">
              {getShortenedFormat(factCheck.factChecker, 10)}
            </div>
          </div>
        </div>
        {!expanded ? (
          <div
            onClick={() => setExpanded(true)}
            className="flex cursor-pointer items-center space-x-2 rounded px-2 py-1 text-sm text-primary"
          >
            <div className="text-sm">Expand</div>
            <ArrowDownOutlined />
          </div>
        ) : (
          <div
            onClick={() => setExpanded(false)}
            className="flex cursor-pointer items-center space-x-2 rounded px-2 py-1 text-sm text-gray-500"
          >
            <CloseOutlined className="text-gray-500 hover:text-red-700" />
          </div>
        )}
      </div>
      <div className="mt-3 border-t border-gray-100 bg-white px-4 py-3 text-sm">
        <div className="item-centers flex space-x-6">
          <span>Status:</span>
          <div
            className={clsx('flex items-center space-x-1', {
              'text-green-800': factCheck.status === 'completed',
              'text-red-800': factCheck.status === 'rejected',
            })}
          >
            {factCheck.status === 'pending' ? (
              <LoadingOutlined />
            ) : factCheck.status === 'completed' ? (
              <CheckCircleOutlined />
            ) : (
              <MinusCircleOutlined />
            )}
            <span className="font-medium capitalize">{factCheck.status}</span>
          </div>
        </div>
      </div>
      {expanded && (
        <>
          <FactCheckRow isOdd label="VERDICT" value={factCheck?.verdict} />
          <FactCheckRow
            isOdd={false}
            label="EVIDENCE URL"
            value={ipfsData?.evidence?.url}
          />
        </>
      )}
    </div>
  );
}
