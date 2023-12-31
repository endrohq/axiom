import { Claim, FactChecker, IpfsClaim, Verdict } from '@shared/typings';
import { convertUnixStringToDate } from '@shared/utils/date.utils';

export function convertToOnChainFactCheckers(
  props: Record<string, any>[],
): FactChecker[] {
  if (!props) return [];
  return props.map(factChecker => {
    return {
      chainId: factChecker.id,
      factChecker: factChecker.factChecker,
      cid: factChecker.cid,
      verdict: convertBigIntToVerdict(factChecker.verdict),
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

export function convertBigIntToVerdict(value: bigint) {
  if (value === undefined) return undefined;
  return value === BigInt(0)
    ? Verdict.TRUE
    : value === BigInt(1)
    ? Verdict.FALSE
    : Verdict.UNVERIFIABLE;
}

export function convertVerdictToBigInt(value: Verdict) {
  if (value === undefined) return undefined;
  return value === Verdict.TRUE
    ? BigInt(0)
    : value === Verdict.FALSE
    ? BigInt(1)
    : BigInt(2);
}

export function convertToOnChainClaim(
  props: Record<string, any>,
): Claim | undefined {
  if (!props) return undefined;
  return {
    id: props.id,
    cid: props.cid,
    factCheckers: convertToOnChainFactCheckers(props.factCheckers),
    assumption: convertBigIntToVerdict(props.assumption),
    verdict: convertBigIntToVerdict(props.verdict),
    // TODO: Replace with actual user name
    createdBy: props.createdBy || '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5',
    claim: props.claim,
    origin: props.origin,
  } as Claim;
}

export function convertToIpfsClaim(
  props: Record<string, any>,
): IpfsClaim | undefined {
  if (!props) return undefined;
  return {
    cid: props.cid,
  } as IpfsClaim;
}
