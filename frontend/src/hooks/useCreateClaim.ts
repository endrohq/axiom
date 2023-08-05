'use client';

import { useClaimContract } from '@shared/hooks/useClaimContract';
import { useIpfs } from '@shared/hooks/useIpfs';
import { ClaimContractEvents, Verdict } from '@shared/typings';
import { useEffect, useState } from 'react';

interface CreateClaimFunctionProps {
  verdict?: Verdict;
  claim: string;
  source: string;
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
    verdict: Verdict;
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
      if (!onChainProps?.cid || !onChainProps?.verdict) return;
      const receipt = await writeContract?.createClaim(
        onChainProps?.cid,
        onChainProps?.verdict,
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
      if (!claim?.verdict) return;
      await setLoading(true);
      const cid = await uploadFile({
        claim: claim.claim,
        source: claim.source,
      });
      setOnChainProps({ cid, verdict: claim.verdict });
    } catch (error) {
      console.error(error);
    }
  }

  return { createClaim: handleCreate, loading, claimId };
}
