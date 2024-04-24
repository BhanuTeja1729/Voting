import { getContract } from "thirdweb";
import client from "../thirdweb/client.js";
import chain from "../thirdweb/chain.js";

// get a contract
const voterContract = getContract({
  client,
  chain: chain,
  address: "0x95A1486Af079c64Fe681305D05146F2176B99C54",
});

export default voterContract;


