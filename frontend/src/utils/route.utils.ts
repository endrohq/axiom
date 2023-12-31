export const ROUTE_LANDING_PAGE = '/';
export const ROUTE_BLOG = '/blog';
export const ROUTE_CHAT = '/chat';
export const ROUTE_CLAIM_ITEM = '/claims/:id';
export const ROUTE_MANIFESTO = '/manifesto';

export const ETHERSCAN_LINK = 'https://etherscan.io/';

export function getClaimItemRoute(id: string) {
  return ROUTE_CLAIM_ITEM.replace(':id', id);
}

export function getEtherScanTxRoute(tx: string) {
  return `${ETHERSCAN_LINK}tx/${tx}`;
}
