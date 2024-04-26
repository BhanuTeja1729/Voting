import { getContract } from "thirdweb";
import client from "../thirdweb/client.js";
import chain from "../thirdweb/chain.js";

// get a contract
const voterContract = getContract({
  client,
  chain: chain,
  address: "0xdb75D6DBE01781803fa2392fbc25978B00Fa99Bf",
});

export default voterContract;
