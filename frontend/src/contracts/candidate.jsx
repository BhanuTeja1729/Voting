import { getContract } from "thirdweb";
import client from "../thirdweb/client.js";
import chain from "../thirdweb/chain.js";

// get a contract
const candContract = getContract({
  client,
  chain: chain,
  address: "0xc60778019C67531ed1A332d452C34cE368714e1D",
});


export default candContract;


