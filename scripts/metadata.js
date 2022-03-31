const { ethers } = require("ethers");
const fetch = require("node-fetch");
const AzukiAbi = require("./Azuki.json");
const axios = require("axios");
const fs = require("fs");

let result_array = [];

async function listenEvent() {
  //connect to infura
  let uri =
    "https://ikzttp.mypinata.cloud/ipfs/QmQFkLSQysj94s5GvTHPyzTxrawwtjgiiYS2TBLgrvw8CW";

  const fetchMetadata = async (tokenId) => {
    try {
      const { data } = await axios.get(uri + "/" + tokenId);
      return data;
    } catch (err) {
      console.log(`token id ${tokenId} : error`);
      return await fetchMetadata(tokenId);
    }
  };

  for (let x = 0; x < 10000; x += 200) {
    const fetchPromises = Array.from(Array(200).keys()).map((i) =>
      fetchMetadata(i + x)
    );
    let result = await Promise.all(fetchPromises);
    result = result.filter((item) => item != undefined);

    result_array.push(...result);

    console.log(x);
  }

  fs.writeFile(
    "scripts/returndata.json",
    JSON.stringify(result_array, null, 2),
    function (err) {
      if (err) {
        return console.log(err);
      }
    }
  );

  const _attributes = result_array.map((item) => item.attributes).flat();

  let _attributesCount = {};

  _attributes.forEach((attribute) => {
    if (!_attributesCount.hasOwnProperty(attribute.trait_type)) {
      _attributesCount[attribute.trait_type] = {};
    }

    if (
      !_attributesCount[attribute.trait_type].hasOwnProperty(attribute.value)
    ) {
      _attributesCount[attribute.trait_type][attribute.value] = 0;
    }

    _attributesCount[attribute.trait_type][attribute.value]++;
  });
  console.log("done");
  fs.writeFile(
    "scripts/count.json",
    JSON.stringify(_attributesCount, null, 2),
    function (err) {
      if (err) {
        return console.log(err);
      }
    }
  );

  let sniper = {};

  for (item in _attributesCount) {
    sniper[item] = {};
    for (value in _attributesCount[item]) {
      if (_attributesCount[item][value] <= 50)
        sniper[item][value] = _attributes[item][value];
    }
  }

  console.log(sniper);
}

console.log(listenEvent());
