require("@nomicfoundation/hardhat-toolbox");
//.env files keeping our key to be secret and this must added to the .gitignore
//this is the environment variables.
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks:{
    //in network we select the sepolia ethereum test net
    sepolia:{
      url:process.env.SEPOLIA_NODE,
      accounts:[process.env.PRIVATE_KEY],
      chainId:11155111,
    },
  }
};
