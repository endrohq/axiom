const HDWalletProvider = require('@truffle/hdwallet-provider');

require('dotenv').config();
const {INFURA_PROJECT_ID = '' } = process.env;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: '5777',    // Any network (default: none)
      websockets: true,
      timeoutBlocks: 40000
    },
    testnet: {
      provider: () => new HDWalletProvider({
        privateKeys: [process.env.PRIVATE_KEY],
        providerOrUrl: "https://linea-goerli.infura.io/v3/" + INFURA_PROJECT_ID,
      }),
      network_id: 59140,         // linea testnet id
      confirmations: 2,      // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 40000,    // # of blocks before a deployment times out  (minimum/default: 50)
    }
  },
  // Set default mocha options here, use special reporters, etc.
  mocha: {
    timeout: 300000
  },
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.13",
      settings: {
        optimizer:{
          enabled: true,
          runs: 200
        }
      }
    }
  }
};
