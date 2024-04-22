import { getContract } from "thirdweb";
import client from "../thirdweb/client.js";
import myChain from "../thirdweb/chain";

// get a contract
const contract = getContract({
  client,
  myChain,
  address: "0xEdbD70ee113790B97CE5aAC3E3D584A29FfA134b",
});
console.log(client);

export default contract;
