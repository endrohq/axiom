'use client';

import { Button } from '@shared/components/button';
import { WarningOutlined } from '@shared/components/icons/WarningOutlined';
import { Modal } from '@shared/components/modal';
import { useMetaMask } from '@shared/hooks/useMetaMask';
import { useEffect, useState } from 'react';

import { localNetwork } from '../../../config/chains';

export function WrongNetwork() {
  const [hasWrongNetwork, setHasWrongNetwork] = useState(false);
  const { provider, metamask } = useMetaMask();

  useEffect(() => {
    async function checkNetwork() {
      if (provider && metamask.activeProvider?.chainId !== localNetwork.id) {
        setHasWrongNetwork(true);
      } else {
        setHasWrongNetwork(false);
      }
    }
    checkNetwork();
    metamask?.activeProvider?.on('chainChanged', checkNetwork);
    return () => {
      metamask?.activeProvider?.removeListener('chainChanged', checkNetwork);
    };
  }, [provider]);

  async function switchNetwork(chainId: string) {
    if (!metamask?.activeProvider) return;

    await metamask?.activeProvider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    });
  }

  return (
    <Modal open={hasWrongNetwork} close={() => ''}>
      <div className="flex h-full flex-col justify-between p-4">
        <div className=" flex flex-col items-center space-y-4">
          <div className="rounded-full bg-red-50 p-4 pt-3 text-2xl leading-none text-red-800">
            <WarningOutlined />
          </div>
          <div>
            Not connected with{' '}
            <span className="font-semibold">{localNetwork.name}</span>.
          </div>
        </div>
        <p className="text-center text-sm text-gray-600">
          Linea Goerli should be added to your wallet. If not, please use{' '}
          <a href="https://chainlist.org/?testnets=true&search=linear">
            Chainlist
          </a>{' '}
          and add testnet to your available networks
        </p>
        <Button
          className="mt-10 py-1 font-medium"
          onClick={() => switchNetwork(localNetwork.id)}
          variant="primary"
          fullSize
        >
          Switch network
        </Button>
      </div>
    </Modal>
  );
}
