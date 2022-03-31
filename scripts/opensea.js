const { ethers } = require("ethers");
const fetch = require("node-fetch");
const AzukiAbi = require("./Azuki.json");
const fs = require("fs");

async function listenEvent() {
  //connect to infura
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-mainnet.alchemyapi.io/v2/VGE8rQts1UvARxlp7APPg4OnMAibhTs9"
  );

  contractAddress = "0xED5AF388653567Af2F388E6224dC7C4b3241C544";

  var contract = new ethers.Contract(contractAddress, AzukiAbi, provider);

  var errorArray = [];

  let result = [];

  let uri =
    "https://ikzttp.mypinata.cloud/ipfs/QmQFkLSQysj94s5GvTHPyzTxrawwtjgiiYS2TBLgrvw8CW";

  //fetches the data from the ipfs
  const fetchMetadata = async (tokenId) => {
    try {
      const response = await fetch(uri + "/" + tokenId);
      const json = await response.json();
      return json;
    } catch (err) {
      console.log(err);
      // errorArray.push(tokenId);
    }
  };

  // init an array from 1 to 10 and fill with fetchMetadata
  for (let x = 0; x <= 2000; x += 200) {
    const fetchPromises = Array.from(Array(200).keys()).map((i) =>
      fetchMetadata(i + x)
    );

    const jsons = await Promise.all(fetchPromises);
    try {
      result.push(...jsons.map((json) => json.attributes[0].value));
    } catch (err) {}

    console.log(x);
  }

  // //remove duplicates in data
  const uniqueData = [...new Set(result)];

  // //check number of times data exist in uniqueData
  const count = uniqueData.map(
    (item) => result.filter((x) => x === item).length
  );

  // //create an object with uniqueData as keys and count as values
  const results = uniqueData.map((item, index) => ({ [item]: count[index] }));

  // console.log(result);
  // console.log(errorArray);
  //write to file
  fs.writeFile(
    "scripts/returndata.json",
    JSON.stringify(results, null, 2),
    function (err) {
      if (err) {
        return console.log(err);
      }
    }
  );

  console.log(results);

  // const jsons = await Promise.all(fetchPromises);
  // fs.writeFile(
  //   "returndata.json",
  //   jsons.map((json) => json.attributes[0].value),
  //   function (err) {
  //     if (err) {
  //       return console.log(err);
  //     }
  //   }
  // );

  // console.log(jsons.map((json) => json.attributes[0].value));
}
console.log(listenEvent());
// console.log(listenEvent());

//   contract.on("OrdersMatched", print);
// }

// console.log(listenEvent());

// function print(buyHash, sellHash, maker, taker, price, metadata) {
//   console.log("Listen to", buyHash, sellHash, maker, taker, price, metadata);
// }
