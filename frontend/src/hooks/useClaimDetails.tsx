'use client';

import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';
import { useClaim } from '@shared/hooks/useClaim';
import { useClaimContract } from '@shared/hooks/useClaimContract';
import { Claim, ClaimContractEvents } from '@shared/typings';
import { ROUTE_LANDING_PAGE } from '@shared/utils/route.utils';
import Link from 'next/link';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from 'react';

const FACT_CHECKERS_AMOUNT = 2;

export interface ClaimDetailsContextProps {
  claim: Claim;
}

export const ClaimDetailsContext = createContext<ClaimDetailsContextProps>({
  claim: {} as Claim,
});

export const useClaimDetails = (): ClaimDetailsContextProps => {
  const context = useContext(ClaimDetailsContext);
  if (!context) {
    throw new Error(`useMetamask must be used within a MetaMaskProvider`);
  }
  return context;
};

type MetaMaskProviderProps = {
  children: ReactNode;
  id: string;
};

export default function ClaimsPageProvider({
  children,
  id,
}: MetaMaskProviderProps) {
  const { readContract } = useClaimContract();
  const { loading, claim, refetch } = useClaim(id);

  useEffect(() => {
    if (!readContract) return;
    readContract.on(ClaimContractEvents.FactCheckerRegistered, () => refetch());
    return () => {
      readContract.removeAllListeners();
    };
  }, [readContract]);

  const value = useMemo(() => {
    return {
      claim: claim as Claim,
      maxFactCheckersCount: FACT_CHECKERS_AMOUNT,
    };
  }, [claim, FACT_CHECKERS_AMOUNT]);

  return (
    <ClaimDetailsContext.Provider value={value}>
      {loading ? (
        <LoadingOutlined />
      ) : !claim ? (
        <div className="text-sm">
          Claim not found.. Go back to the{' '}
          <Link className="text-primary" href={ROUTE_LANDING_PAGE}>
            homepage
          </Link>
        </div>
      ) : (
        children
      )}
    </ClaimDetailsContext.Provider>
  );
}
