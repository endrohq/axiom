'use client';

import { useMetaMask } from '@shared/hooks/useMetaMask';
import { Contract } from 'ethers';
import { useMemo } from 'react';

import { claimsContract } from '../config/contracts/claims';

interface CreateClaimProps {
  writeContract?: Contract;
  readContract?: Contract;
}

export function useClaimContract(): CreateClaimProps {
  const { signer, provider } = useMetaMask();
  return useMemo(() => {
    return {
      writeContract:
        signer &&
        new Contract(claimsContract.address, claimsContract.abi, signer),
      readContract: new Contract(
        claimsContract.address,
        claimsContract.abi,
        provider,
      ),
    };
  }, [signer, claimsContract.abi, claimsContract.address]);
}
