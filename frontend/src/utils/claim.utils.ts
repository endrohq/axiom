import { OnChainClaim } from '@shared/typings';

export function convertToOnChainClaim(
  props: Record<string, any>,
): OnChainClaim | undefined {
  if (!props) return undefined;
  return {
    id: props.id,
    cid: props.cid,
  } as OnChainClaim;
}
