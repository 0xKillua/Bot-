const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-mainnet.alchemyapi.io/v2/VGE8rQts1UvARxlp7APPg4OnMAibhTs9"
);

async function getBalance() {
  let b = await provider.getBalance("fomoguy.eth");
  console.log(ethers.utils.formatEther(b));
}

console.log(getBalance());
