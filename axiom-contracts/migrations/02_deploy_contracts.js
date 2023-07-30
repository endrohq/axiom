const FactCheck = artifacts.require("FactCheck");

const HDWalletProvider = require('@truffle/hdwallet-provider');
const secrets = require("../secret.json");

module.exports = function(deployer, network, accounts) {
	if(network === 'development'){
		deployer.deploy(FactCheck, { from: secrets.fromAddress });
	}
	else{
		const provider = new HDWalletProvider({
			privateKeys: ['<YourPrivateKey>'], // Private keys of the account you want to deploy with
			providerOrUrl: 'https://ropsten.infura.io/v3/<YourInfuraProjectId>' // Provider URL (ex. Infura)
		});

		deployer.deploy(FactCheck, {from: provider.getAddress()});
	}
};
