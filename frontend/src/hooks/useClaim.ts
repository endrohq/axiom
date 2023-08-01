import { useClaimContract } from '@shared/hooks/useClaimContract';
import { useIpfs } from '@shared/hooks/useIpfs';
import { Claim } from '@shared/typings';
import {
  convertToIpfsClaim,
  convertToOnChainClaim,
} from '@shared/utils/claim.utils';
import { useEffect, useState } from 'react';

interface useClaimProps {
  claim?: Claim;
  loading: boolean;
  refetch: () => void;
}

export function useClaim(id: string): useClaimProps {
  const [claim, setClaim] = useState<Claim>();
  const [loading, setLoading] = useState(true);
  const { readContract: contract } = useClaimContract();
  const { readFile } = useIpfs();

  useEffect(() => {
    if (id && contract) {
      fetchClaim(id);
    }
  }, [id, contract]);

  async function fetchClaim(id: string) {
    try {
      const result = await contract?.getClaim(id);
      const claim = convertToOnChainClaim(result);
      if (claim?.cid) {
        const ipfsClaim = await readFile(claim.cid);
        const parsedIpfsClaim = convertToIpfsClaim(ipfsClaim || {});
        setClaim({
          ...claim,
          ...parsedIpfsClaim,
        } as Claim);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return { loading, claim: claim as Claim, refetch: () => fetchClaim(id) };
}
