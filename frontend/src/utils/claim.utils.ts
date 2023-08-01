import { FactChecker, IpfsClaim, OnChainClaim } from '@shared/typings';

export function convertToOnChainFactCheckers(
  props: Record<string, any>[],
): FactChecker[] {
  if (!props) return [];
  return props.map(factChecker => {
    return {
      id: factChecker.id,
      factCheckerAddress: factChecker.factCheckerAddress,
      timestamp: new Date(Number(factChecker.timestamp) * 1000),
      status: factChecker.status || 'pending',
    } as FactChecker;
  });
}

export function convertToOnChainClaim(
  props: Record<string, any>,
): OnChainClaim | undefined {
  if (!props) return undefined;
  return {
    id: props.id,
    cid: props.cid,
    factCheckers: convertToOnChainFactCheckers(props.factCheckers),
  } as OnChainClaim;
}

export function convertToIpfsClaim(
  props: Record<string, any>,
): IpfsClaim | undefined {
  if (!props) return undefined;
  return {
    claim: props.claim,
    source: props.source,
    cid: props.cid,
  } as IpfsClaim;
}
