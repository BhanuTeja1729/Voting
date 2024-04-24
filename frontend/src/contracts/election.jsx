import { getContract } from "thirdweb";
import client from "../thirdweb/client.js";
import chain from "../thirdweb/chain.js";

// get a contract
const elecContract = getContract({
  client,
  chain: chain,
  address: "0xa4378CB8D35DF4DC93d6992927b6b753F6112d5cc",
});

export default elecContract;
