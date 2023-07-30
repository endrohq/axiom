import { useMetaMask } from '@shared/hooks/useMetaMask';
import { Claim } from '@shared/typings';
import { isArrayWithElements } from '@shared/utils/array.utils';
import { Contract } from 'ethers';
import { useEffect, useState } from 'react';

import { claimsContract } from '../config/contracts/claims';

interface useClaimProps {
  claims?: Claim[];
  loading: boolean;
}

export function useClaims(): useClaimProps {
  const { provider } = useMetaMask();
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClaims();
  }, []);

  async function fetchClaims() {
    try {
      const contract = new Contract(
        claimsContract.address,
        claimsContract.abi,
        provider,
      );
      const claims = await contract.getClaimsByPage(0);
      console.log(claims);
      if (isArrayWithElements(claims)) setClaims(claims);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return { loading, claims };
}
