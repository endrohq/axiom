const HDWalletProvider = require('@truffle/hdwallet-provider');

require('dotenv').config();
const { MNEMONIC = '', INFURA_PROJECT_ID = '' } = process.env;

// const HDWalletProvider = require('@truffle/hdwallet-provider');

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
      provider: () => new HDWalletProvider(MNEMONIC, "https://ropsten.infura.io/v3/" + INFURA_PROJECT_ID),
      network_id: 3,         // Ropsten's id
      gas: 5500000,          // Ropsten has a lower block limit than mainnet
      confirmations: 2,      // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,    // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true        // Skip dry run before migrations? (default: false for public nets )
    },
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
