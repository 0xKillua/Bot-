const { ethers } = require("ethers");
const fs = require("fs");

const url =
  "https://eth-mainnet.alchemyapi.io/v2/VGE8rQts1UvARxlp7APPg4OnMAibhTs9";

// var init = function () {
//   var customProvider = new ethers.providers.WebSocketProvider(url);
//   customProvider.on("pending", (tx) => {
//     customProvider.getTransaction(tx).then(function (transaction) {
//       console.log(transaction);
//     });
//   });
// };

let gwei = 1 * 1e9;

var init = async function () {
  var provider = new ethers.providers.WebSocketProvider(url);
  const b = await provider.getTransaction(
    "0xf05a08ab0725a5ff772981b7f5befad1b759082c04cb2a528f156c8afd86eb00"
  );

  fs.writeFile(
    "walletTracking/pendingData.json",
    JSON.stringify(b),
    function (err) {
      if (err) console.log(err);
    }
  );
  console.log(b.data);
  console.log(ethers.utils.formatEther(b.gasPrice) * gwei);
};

init();
