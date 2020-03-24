const DogToken = artifacts.require("DogToken");
const SheepToken = artifacts.require("SheepToken");
const PigToken = artifacts.require("PigToken");


module.exports = async function(deployer) {
  await deployer.deploy(DogToken);
  const dogToken = await DogToken.deployed();

  await deployer.deploy(PigToken);
  const pigToken = await PigToken.deployed();

  await deployer.deploy(SheepToken);
  const sheepToken = await SheepToken.deployed();
};
