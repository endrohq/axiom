const FactCheckContract = artifacts.require("FactCheckContract");

const HDWalletProvider = require('@truffle/hdwallet-provider');
const secrets = require("../secret.json");

module.exports = function(deployer, network, accounts) {
	if(network === 'development'){
		deployer.deploy(FactCheckContract, { from: secrets.fromAddress });
	}
	else{
		const provider = new HDWalletProvider({
			privateKeys: ['<YourPrivateKey>'], // Private keys of the account you want to deploy with
			providerOrUrl: 'https://ropsten.infura.io/v3/<YourInfuraProjectId>' // Provider URL (ex. Infura)
		});

		deployer.deploy(FactCheckContract, {from: provider.getAddress()});
	}
};
