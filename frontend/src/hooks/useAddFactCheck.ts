'use client';

import { useClaimContract } from '@shared/hooks/useClaimContract';
import { useIpfs } from '@shared/hooks/useIpfs';
import { ClaimContractEvents, Evidence, Verdict } from '@shared/typings';
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
  const { writeContract } = useClaimContract();
  const [onChainProps, setOnChainProps] = useState<{
    cid: string;
    verdict: Verdict;
  }>();
  const [factCheckCompleted, setFactCheckCompleted] = useState<boolean>(false);

  useEffect(() => {
    writeContract?.on(ClaimContractEvents.VerdictSubmitted, () =>
      setFactCheckCompleted(true),
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
      const receipt = await writeContract?.submitVerdict(
        claimId,
        onChainProps?.verdict,
        onChainProps?.cid,
      );
      await receipt.wait();
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
