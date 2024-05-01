import { getContract } from "thirdweb";
import client from "../thirdweb/client.js";
import chain from "../thirdweb/chain.js";

// get a contract
const candContract = getContract({
  client,
  chain: chain,
  address: "0x965BfDD6AB627C2771B84818989d48faB77c4B7A",
});


export default candContract;


