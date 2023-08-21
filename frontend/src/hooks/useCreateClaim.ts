'use client';

import { useClaimContract } from '@shared/hooks/useClaimContract';
import { useMetaMask } from '@shared/hooks/useMetaMask';
import { ClaimContractEvents, Verdict } from '@shared/typings';
import { convertVerdictToBigInt } from '@shared/utils/claim.utils';
import { useRouter } from 'next/navigation';
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
  const { targetNetwork } = useMetaMask();
  const [loading, setLoading] = useState(false);
  const [timeOutTrigger, setTimeOutTrigger] = useState(false);
  const { writeContract, readContract } = useClaimContract();
  const [onChainProps, setOnChainProps] = useState<{
    claim: string;
    origin: string;
    assumption: Verdict;
  }>();
  const [claimId, setClaimId] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    readContract?.on(ClaimContractEvents.ClaimCreated, (claimID: string) => {
      setClaimId(claimID);
      setLoading(false);
    });
    return () => {
      readContract?.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (timeOutTrigger) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 10000);
      router.push('/redirect');
      return () => clearTimeout(timer);
    }
  }, [timeOutTrigger]);

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
      if (targetNetwork?.chainId === '0xe704') {
        setTimeOutTrigger(true);
      }
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
