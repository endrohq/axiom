import { useIpfs } from '@shared/hooks/useIpfs';
import { useMetaMask } from '@shared/hooks/useMetaMask';
import { Claim, IpfsClaim } from '@shared/typings';
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
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const { readFile } = useIpfs();

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
      const onChainClaims: Claim[] = result.map((item: any) =>
        convertToOnChainClaim(item),
      );

      const ipfsRecords = await Promise.all(
        onChainClaims?.map(claim => readFile<IpfsClaim>(claim.cid)),
      );
      const claims = onChainClaims?.map((claim, index) => {
        return {
          ...claim,
          ...ipfsRecords[index],
        } as Claim;
      });
      if (isArrayWithElements(claims)) setClaims(claims);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return { loading, claims: claims as Claim[] };
}
