'use client';

import { useClaimContract } from '@shared/hooks/useClaimContract';
import { useIpfs } from '@shared/hooks/useIpfs';
import { ClaimContractEvents, Evidence } from '@shared/typings';
import { useEffect, useState } from 'react';

interface addFactCheckFnProps {
  evidence: Evidence;
  verdict: string;
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
  const [cid, setCid] = useState<string>();
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
    if (cid) handleTxnWrite();
  }, [cid]);

  async function handleTxnWrite() {
    try {
      const receipt = await writeContract?.submitVerdict(claimId, cid);
      await receipt.wait();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function addFactCheck(claim: addFactCheckFnProps) {
    try {
      await setLoading(true);
      const cid = await uploadFile(claim);
      setCid(cid);
    } catch (error) {
      console.error(error);
    }
  }

  return { addFactCheck, loading, factCheckCompleted };
}
