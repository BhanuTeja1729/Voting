import { getContract } from "thirdweb";
import client from "../thirdweb/client.js";
import chain from "../thirdweb/chain.js";

// get a contract
const voterContract = getContract({
  client,
  chain: chain,
  address: "0xbf2Eb35CbB541E4780c0f0689ce9b7f5B20757CE",
});

export default voterContract;
