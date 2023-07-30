import { useMetaMask } from '@shared/hooks/useMetaMask';
import { Claim, OnChainClaim } from '@shared/typings';
import { isArrayWithElements } from '@shared/utils/array.utils';
import { convertToOnChainClaim } from '@shared/utils/claim.utils';
import { Contract } from 'ethers';
import { useEffect, useState } from 'react';

import { claimsContract } from '../config/contracts/claims';

interface useClaimProps {
  claims?: Claim[];
  loading: boolean;
}

export function useClaims(): useClaimProps {
  const { provider } = useMetaMask();
  const [onChainClaims, setOnChainClaims] = useState<OnChainClaim[]>([]);
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
      const result = await contract.getClaimsByPage(0);
      const claims = result.map((item: any) => convertToOnChainClaim(item));
      if (isArrayWithElements(claims)) setOnChainClaims(claims);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return { loading, claims: onChainClaims as Claim[] };
}
