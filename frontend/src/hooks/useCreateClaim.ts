'use client';

import { useClaimContract } from '@shared/hooks/useClaimContract';
import { useIpfs } from '@shared/hooks/useIpfs';
import { ClaimContractEvents } from '@shared/typings';
import { useEffect, useState } from 'react';

interface CreateClaim {
  claim: string;
}

interface CreateClaimProps {
  createClaim: (claim: CreateClaim) => Promise<void>;
  loading: boolean;
  claimId: string | undefined;
}

export function useCreateClaim(): CreateClaimProps {
  const [loading, setLoading] = useState(false);
  const { uploadFile } = useIpfs();
  const { writeContract } = useClaimContract();
  const [cid, setCid] = useState<string>();
  const [claimId, setClaimId] = useState<string>();

  useEffect(() => {
    writeContract?.on(ClaimContractEvents.ClaimCreated, (claimID: string) =>
      setClaimId(claimID),
    );
    return () => {
      writeContract?.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (cid) handleTxnWrite();
  }, [cid]);

  async function handleTxnWrite() {
    try {
      const receipt = await writeContract?.createClaim(cid);
      await receipt.wait();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(claim: CreateClaim) {
    try {
      await setLoading(true);
      const cid = await uploadFile(claim);
      setCid(cid);
    } catch (error) {
      console.error(error);
    }
  }

  return { createClaim: handleCreate, loading, claimId };
}
