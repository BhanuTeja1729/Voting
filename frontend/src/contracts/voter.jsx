import { getContract } from "thirdweb";
import client from "../thirdweb/client.js";
import chain from "../thirdweb/chain.js";
import { resolveMethod } from "thirdweb";
import { useReadContract } from "thirdweb/react";
// get a contract
const contract = getContract({
  client,
  chain: chain,
  address: "0xEdbD70ee113790B97CE5aAC3E3D584A29FfA134b",
});


export default contract;


