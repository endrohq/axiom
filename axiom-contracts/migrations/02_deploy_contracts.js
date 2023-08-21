const FactCheckContract = artifacts.require("FactCheckContract");

const secrets = require("../secret.json");

module.exports = function(deployer, network, accounts) {
	if(network === 'development'){
		deployer.deploy(FactCheckContract, { from: secrets.fromAddress });
	}
	else if (network === 'testnet'){
		deployer.deploy(FactCheckContract);
	}
};
