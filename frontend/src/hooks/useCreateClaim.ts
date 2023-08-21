'use client';

import { useClaimContract } from '@shared/hooks/useClaimContract';
import { ClaimContractEvents, Verdict } from '@shared/typings';
import { convertVerdictToBigInt } from '@shared/utils/claim.utils';
import { useEffect, useState } from 'react';

interface CreateClaimFunctionProps {
  assumption?: Verdict;
  claim: string;
  origin: string;
  topics: string[];
}

interface CreateClaimProps {
  createClaim: (claim: CreateClaimFunctionProps) => Promise<void>;
  loading: boolean;
  claimId: string | undefined;
}

export function useCreateClaim(): CreateClaimProps {
  const [loading, setLoading] = useState(false);
  const { writeContract, readContract } = useClaimContract();
  const [onChainProps, setOnChainProps] = useState<{
    claim: string;
    origin: string;
    assumption: Verdict;
  }>();
  const [claimId, setClaimId] = useState<string>();

  useEffect(() => {
    readContract?.on(ClaimContractEvents.ClaimCreated, (claimID: string) => {
      setClaimId(claimID);
      setLoading(false);
    });
    return () => {
      writeContract?.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (onChainProps) handleTxnWrite();
  }, [onChainProps]);

  async function handleTxnWrite() {
    try {
      const receipt = await writeContract?.createClaim(
        onChainProps?.claim,
        convertVerdictToBigInt(onChainProps?.assumption as Verdict),
        onChainProps?.origin,
      );
      await receipt.wait();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCreate(claim: CreateClaimFunctionProps) {
    try {
      await setLoading(true);
      setOnChainProps({
        assumption: claim.assumption as Verdict,
        claim: claim.claim,
        origin: claim.origin,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return { createClaim: handleCreate, loading, claimId };
}
