import { useMetaMask } from '@shared/hooks/useMetaMask';
import { Claim } from '@shared/typings';
import { Contract } from 'ethers';
import { useEffect, useState } from 'react';

import { claimsContract } from '../config/contracts/claims';

interface useClaimProps {
  claim?: Claim;
  loading: boolean;
}

export function useClaim(id: string): useClaimProps {
  const [claim, setClaim] = useState<Claim>();
  const [loading, setLoading] = useState(true);
  const { provider } = useMetaMask();

  useEffect(() => {
    if (id) {
      fetchClaim(id);
    }
  }, [id]);

  async function fetchClaim(id: string) {
    try {
      const contract = new Contract(
        claimsContract.address,
        claimsContract.abi,
        provider,
      );
      const result = await contract.getClaim(id);
      setClaim({
        ipfsClaimDetailsHash: result.ipfsClaimDetailsHash,
        factCheckers: result.factCheckers,
        ipfsFinalVerdictHash: result.ipfsFinalVerdictHash,
      } as any);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return { loading, claim };
}
