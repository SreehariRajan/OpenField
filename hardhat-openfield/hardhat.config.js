require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/A0WsVMwzZrhZNtpslk8RDsbxZvHGvyfL",
      accounts: [`...`]
    }
  },
};
