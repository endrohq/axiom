'use client';

import { useClaimContract } from '@shared/hooks/useClaimContract';
import { useIpfs } from '@shared/hooks/useIpfs';
import { useMetaMask } from '@shared/hooks/useMetaMask';
import { ClaimContractEvents, Evidence, Verdict } from '@shared/typings';
import { convertVerdictToBigInt } from '@shared/utils/claim.utils';
import { useEffect, useState } from 'react';

interface addFactCheckFnProps {
  evidence: Evidence;
  verdict: Verdict;
}

interface useAddFactCheckProps {
  addFactCheck: (factCheck: addFactCheckFnProps) => Promise<void>;
  loading: boolean;
  factCheckCompleted: boolean;
}

export function useAddFactCheck(claimId: string): useAddFactCheckProps {
  const [loading, setLoading] = useState(false);
  const { uploadFile } = useIpfs();
  const { targetNetwork } = useMetaMask();
  const { writeContract, readContract } = useClaimContract();
  const [onChainProps, setOnChainProps] = useState<{
    cid: string;
    verdict: Verdict;
  }>();
  const [factCheckCompleted, setFactCheckCompleted] = useState<boolean>(false);
  const [timeOutTrigger, setTimeOutTrigger] = useState(false);

  useEffect(() => {
    readContract?.on(ClaimContractEvents.VerdictSubmitted, () =>
      setFactCheckCompleted(true),
    );
    return () => {
      readContract?.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (timeOutTrigger) {
      const timer = setTimeout(() => {
        setFactCheckCompleted(true);
      }, 7500);
      return () => clearTimeout(timer);
    }
  }, [timeOutTrigger]);

  useEffect(() => {
    if (onChainProps) handleTxnWrite();
  }, [onChainProps]);

  async function handleTxnWrite() {
    try {
      const receipt = await writeContract?.submitVerdict(
        claimId,
        convertVerdictToBigInt(onChainProps?.verdict as Verdict),
        onChainProps?.cid,
      );
      await receipt.wait();
      if (targetNetwork?.chainId === '0xe704') {
        setTimeOutTrigger(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function addFactCheck({ verdict, ...props }: addFactCheckFnProps) {
    try {
      await setLoading(true);
      const cid = await uploadFile(props);
      setOnChainProps({ cid, verdict });
    } catch (error) {
      console.error(error);
    }
  }

  return { addFactCheck, loading, factCheckCompleted };
}
