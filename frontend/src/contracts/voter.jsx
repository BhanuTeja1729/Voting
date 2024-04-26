import { getContract } from "thirdweb";
import client from "../thirdweb/client.js";
import chain from "../thirdweb/chain.js";

// get a contract
const voterContract = getContract({
  client,
  chain: chain,
  address: "0x87Ffd0136E7a8A0f0Aff394F7BD7e2Ba16305ABF",
});

export default voterContract;
