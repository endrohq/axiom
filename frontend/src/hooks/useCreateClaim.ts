import { useIpfs } from '@shared/hooks/useIpfs';
import { useState } from 'react';

interface CreateClaim {
  claim: string;
}

interface CreateClaimProps {
  createClaim: (claim: CreateClaim) => Promise<void>;
  loading: boolean;
}

export function useCreateClaim(): CreateClaimProps {
  const [loading, setLoading] = useState(false);
  const { uploadFile } = useIpfs();

  async function handleCreate(claim: CreateClaim) {
    try {
      await setLoading(true);
      const cid = await uploadFile(claim);
      console.log(cid);
      // TODO: save CID to blockchain
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return { createClaim: handleCreate, loading };
}
