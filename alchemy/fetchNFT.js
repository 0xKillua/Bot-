const { ethers } = require("ethers");
const env = require("../environment/environment.js");
const axios = require("axios");
const fs = require("fs");
const baseURL = `${env.url}/getNFTs/`;
var pageKey = "";
var totalCount = 0;

const _address = "evmojo.eth";
var config = {
  method: "get",
  url: `${baseURL}?owner=${_address}`,
};
let nftTotal = [];
let x = 1;
const fetch = async function () {
  do {
    const response = await axios(config);
    response.data.hasOwnProperty("pageKey")
      ? (pageKey = response.data.pageKey)
      : (pageKey = "");
    totalCount = response.data.totalCount;
    let nftProject = response.data.ownedNfts.map((item) => item.title);
    nftProject = nftProject.filter((item) => item != "");
    nftTotal.push(...nftProject);
    config.url = `${baseURL}?owner=${_address}&pageKey=${pageKey}`;
    console.log(`Fetching page ${x++}`);
  } while (pageKey != "");

  console.log(`Total NFTs transaction: ${totalCount}`);
  console.log(`Total NFTs in wallet: ${nftTotal.length}`);

  fs.writeFile(
    "alchemy/data.json",
    JSON.stringify(nftTotal, null, 2),
    function (err) {
      if (err) {
        return console.log(err);
      }
    }
  );
  return "DOne";
};

fetch();
