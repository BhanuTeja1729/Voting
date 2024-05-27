import { getContract } from "thirdweb";
import client from "../thirdweb/client.js";
import chain from "../thirdweb/chain.js";

// get a contract
const voterContract = getContract({
  client,
  chain: chain,
  address: "0x4442bfbd9f9b4b096C3906eeF1005F120058B43f",
});

export default voterContract;
