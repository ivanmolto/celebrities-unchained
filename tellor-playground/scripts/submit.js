// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const superagent = require('superagent');
const url = "https://dul24yhlppwxb.cloudfront.net/9634.json";
const apiKey = require("../infura.json")
const privateKey = require("../pKey.json")

async function submit() {
  
  let res =  await superagent.get(url)
  let price = res.body.price;
  let value = price;
  
  const provider = new hre.ethers.providers.InfuraProvider("ropsten", apiKey)
  let wallet = new hre.ethers.Wallet(privateKey.key, provider);
  
  //Submit Value to Tellor Playground
  const abi = [
      // Authenticated Functions
      "function submitValue(uint256 _requestId,uint256 _value) external",
  ];
  const DATAPOINT_ID = 109634;
  const address = "0x20374E579832859f180536A69093A126Db1c8aE9";
  const tellorPlayground = new hre.ethers.Contract(address, abi, wallet);
  await tellorPlayground.submitValue(DATAPOINT_ID, value);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
submit()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
