export const ROUTE_LANDING_PAGE = '/';
export const ROUTE_CLAIMS = '/claims';
export const ROUTE_CLAIM_ITEM = '/claims/:id';

export function getClaimItemRoute(id: string) {
  return ROUTE_CLAIM_ITEM.replace(':id', id);
}
