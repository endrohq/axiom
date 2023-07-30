'use client';

import { useIpfs } from '@shared/hooks/useIpfs';
import { useMetaMask } from '@shared/hooks/useMetaMask';
import { Contract } from 'ethers';
import { useEffect, useState } from 'react';

import { claimsContract } from '../config/contracts/claims';

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
  const { signer } = useMetaMask();
  const [contract, setContract] = useState<Contract>();
  const [cid, setCid] = useState<string>();
  const [claimId, setClaimId] = useState<string>();

  useEffect(() => {
    const contract = new Contract(
      claimsContract.address,
      claimsContract.abi,
      signer,
    );
    contract.on('ClaimCreated', (claimID: string) => setClaimId(claimID));
    setContract(contract);
    return () => {
      contract.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (cid) handleTxnWrite();
  }, [cid]);

  async function handleTxnWrite() {
    try {
      const receipt = await contract?.createClaim(cid);
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
