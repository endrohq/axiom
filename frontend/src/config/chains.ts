export const localNetwork = {
  chainId: '0x539',
  chainName: 'localhost',
  rpcUrls: ['http://127.0.0.1:7545'],
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
};

export const lineaTestnet = {
  chainId: '0xe704',
  chainName: 'Linea Testnet',
  rpcUrls: [
    `https://linea-goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_LINEA_RPC_API_KEY}`,
  ],
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
};
