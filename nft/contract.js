const { ethers, utils, Contract } = require("ethers");
const openseaAbi = require("./opensea.json");
const whaleAddres = require("./whaleWallet.js");
const { hexZeroPad } = require("ethers/lib/utils");

const url =
  "https://eth-mainnet.alchemyapi.io/v2/VGE8rQts1UvARxlp7APPg4OnMAibhTs9";

const ens = "fomoguy.eth";

const provider = new ethers.providers.WebSocketProvider(url);

let contract = new ethers.Contract(
  "0x7f268357A8c2552623316e2562D90e642bB538E5",
  openseaAbi,
  provider
);

const track = async function () {
  console.log(whaleAddress);

  const adds = await provider.resolveName(ens);
  contract.on("OrdersMatched", (a, b, c, d, e, f) => {
    if (wallet.includes(d)) console.log(`From ${c}, To:${d}`);
  });
};

track();
// let walletTracker = async function () {
//   const address = await provider.resolveName(ens);
//   const filter = {
//     address: "0x7f268357A8c2552623316e2562D90e642bB538E5",
//     topics: [
//       utils.id("OrdersMatched(byte32,byte32,address,address,uint256,byte32)"),
//       null,
//       hexZeroPad("0xdb7096bba63ae33c815554f0f22f6312f6bfd39e", 32),
//     ],
//   };
//   provider.on(filter, (transaction) => {
//     console.log(transaction);
//   });
// };
