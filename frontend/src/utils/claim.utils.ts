import { FactChecker, IpfsClaim, OnChainClaim, Verdict } from '@shared/typings';

export function convertToOnChainFactCheckers(
  props: Record<string, any>[],
): FactChecker[] {
  if (!props) return [];
  return props.map(factChecker => {
    return {
      id: factChecker.id,
      factChecker: factChecker.factChecker,
      cid: factChecker.cid,
      verdict: factChecker.verdict && Verdict[factChecker.verdict],
      dateCompleted:
        factChecker.dateCompleted > 0
          ? new Date(Number(factChecker.dateCompleted) * 1000)
          : 0,
      dateStarted:
        factChecker.dateStarted > 0
          ? new Date(Number(factChecker.dateStarted) * 1000)
          : 0,
      status: factChecker.cid ? 'completed' : 'pending',
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
