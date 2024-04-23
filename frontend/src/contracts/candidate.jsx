import { getContract } from "thirdweb";
import client from "../thirdweb/client.js";
import chain from "../thirdweb/chain.js";

// get a contract
const candContract = getContract({
  client,
  chain: chain,
  address: "0xF74db5AB07A77cCd7b394810cA3bB04167EDf95C",
});


export default candContract;


