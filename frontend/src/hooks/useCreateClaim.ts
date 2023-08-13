'use client';

import { useClaimContract } from '@shared/hooks/useClaimContract';
import { useIpfs } from '@shared/hooks/useIpfs';
import { ClaimContractEvents, Verdict } from '@shared/typings';
import { useEffect, useState } from 'react';

interface CreateClaimFunctionProps {
  assumption?: Verdict;
  claim: string;
  source: string;
  topics: string[];
}

interface CreateClaimProps {
  createClaim: (claim: CreateClaimFunctionProps) => Promise<void>;
  loading: boolean;
  claimId: string | undefined;
}

export function useCreateClaim(): CreateClaimProps {
  const [loading, setLoading] = useState(false);
  const { uploadFile } = useIpfs();
  const { writeContract } = useClaimContract();
  const [onChainProps, setOnChainProps] = useState<{
    cid: string;
    assumption: Verdict;
  }>();
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
    if (onChainProps) handleTxnWrite();
  }, [onChainProps]);

  async function handleTxnWrite() {
    try {
      if (!onChainProps?.cid || !onChainProps?.assumption) return;
      const receipt = await writeContract?.createClaim(
        onChainProps?.cid,
        onChainProps?.assumption,
      );
      await receipt.wait();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(claim: CreateClaimFunctionProps) {
    try {
      if (!claim?.assumption) return;
      await setLoading(true);
      const cid = await uploadFile({
        claim: claim.claim,
        source: claim.source,
        topics: claim.topics,
      });
      setOnChainProps({ cid, assumption: claim.assumption });
    } catch (error) {
      console.error(error);
    }
  }

  return { createClaim: handleCreate, loading, claimId };
}
