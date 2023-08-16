import { FactChecker, IpfsClaim, OnChainClaim, Verdict } from '@shared/typings';
import { convertUnixStringToDate } from '@shared/utils/date.utils';

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
          ? convertUnixStringToDate(factChecker.dateCompleted)
          : 0,
      dateStarted:
        factChecker.dateStarted > 0
          ? convertUnixStringToDate(factChecker.dateStarted)
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
    assumption: props.assumption && Verdict[props.assumption],
    verdict: props.verdict && Verdict[props.verdict],
    // TODO: Replace with actual user name
    createdBy: props.createdBy || '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5',
    claim: props.claim,
    origin: props.origin,
  } as OnChainClaim;
}

export function convertToIpfsClaim(
  props: Record<string, any>,
): IpfsClaim | undefined {
  if (!props) return undefined;
  return {
    cid: props.cid,
  } as IpfsClaim;
}
