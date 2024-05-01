import { getContract } from "thirdweb";
import client from "../thirdweb/client.js";
import chain from "../thirdweb/chain.js";

// get a contract
const voterContract = getContract({
  client,
  chain: chain,
  address: "0x05711e8385eE64339E929C470cd42A411A9D579E",
});

export default voterContract;
