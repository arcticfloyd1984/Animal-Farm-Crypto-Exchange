const DogToken = artifacts.require("DogToken");
const SheepToken = artifacts.require("SheepToken");
const PigToken = artifacts.require("PigToken");
const CryptoExchange = artifacts.require("CryptoExchange");


module.exports = async function(deployer) {
  
  // Deploy Tokens 
  await deployer.deploy(DogToken);
  const dogToken = await DogToken.deployed();

  await deployer.deploy(PigToken);
  const pigToken = await PigToken.deployed();

  await deployer.deploy(SheepToken);
  const sheepToken = await SheepToken.deployed();

  //Deploy Crypto-Exchange
  await deployer.deploy(CryptoExchange, dogToken.address, sheepToken.address, pigToken.address);
  const cryptoExchnage = await CryptoExchange.deployed(); 

  // Transfer tokens to the crypto-exchange
  await dogToken.transfer(cryptoExchnage.address, '1000000000000000000000000');
  await sheepToken.transfer(cryptoExchnage.address, '100000000000000000000000');
  await pigToken.transfer(cryptoExchnage.address, '10000000000000000000000');
};
