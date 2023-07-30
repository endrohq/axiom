import jazzicon from '@raugfer/jazzicon';
import clsx from 'clsx';
import { isAddress } from 'ethers';

interface EthAddressIconProps {
  address?: string;
  size?: 'large' | 'medium';
}

export function EthAddressIcon({
  address,
  size = 'medium',
}: EthAddressIconProps) {
  // builds an image data url for embedding
  function buildDataUrl(address: string): string {
    return `data:image/svg+xml;base64,${btoa(jazzicon(address))}`;
  }

  if (!address || !isAddress(address)) {
    return (
      <div
        className={clsx('rounded-full bg-gray-100', {
          'h-10 w-10': size === 'large',
          'h-6 w-6': size === 'medium',
        })}
      />
    );
  }

  return (
    <img
      className={clsx('rounded-full', {
        'h-10 w-10': size === 'large',
        'h-6 w-6': size === 'medium',
      })}
      src={buildDataUrl(address)}
      alt="user address"
    />
  );
}
