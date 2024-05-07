import { getContract } from "thirdweb";
import client from "../thirdweb/client.js";
import chain from "../thirdweb/chain.js";

// get a contract
const candContract = getContract({
  client,
  chain: chain,
  address: "0xDe80bEac29525276dd79bc2D0eAaC42b044094a3",
});


export default candContract;


