import { getContract } from "thirdweb";
import client from "../thirdweb/client.js";
import chain from "../thirdweb/chain.js";

// get a contract
const candContract = getContract({
  client,
  chain: chain,
  address: "0xf09070335B778b3dB5549428099aEe99871c6d76",
});


export default candContract;


