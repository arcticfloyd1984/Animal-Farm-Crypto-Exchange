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


  await dogToken.transfer('0x3D5ee9aCc939f4EaA7e399bDDCc5b1B43649dE23', '1000000000000000000000000');
  await pigToken.transfer('0xd8c6BA4f55b080acFe238447A3AA8eB5f090e716', '1000000000000000000000000');
  await sheepToken.transfer('0xEdA8fba34025948F458AC7128AEC97a767965c91', '1000000000000000000000000');
};
