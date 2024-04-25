import { getContract } from "thirdweb";
import client from "../thirdweb/client.js";
import chain from "../thirdweb/chain.js";

// get a contract
const elecContract = getContract({
  client,
  chain: chain,
  address: "0xfe3F893BAD036e4F18dF9D9E0617eE29b14c6FE2",
});

export default elecContract;
