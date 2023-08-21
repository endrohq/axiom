'use client';

import { useMetaMask } from '@shared/hooks/useMetaMask';

export function NetworkIndicator() {
  const { targetNetwork } = useMetaMask();
  return (
    <div className="mr-2 border-r border-gray-500 pr-4 text-right text-xs ">
      <div className="text-gray-400">Active Network</div>
      <div className=" text-white">{targetNetwork?.chainName}</div>
    </div>
  );
}
