const { ethers } = require("hardhat");

async function main() {
  const OpenField = await ethers.getContractFactory("OpenField");
  const openField = await OpenField.deploy()
  // await openField.deployed()
  console.log("Contract deployed to:", await openField.getAddress());

}

// 0x3b220505aEa2c9548330bb63886ff0d943A70131

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  })