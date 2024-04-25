import { getContract } from "thirdweb";
import client from "../thirdweb/client.js";
import chain from "../thirdweb/chain.js";

// get a contract
const elecContract = getContract({
  client,
  chain: chain,
  address: "0x1C2721731C7CAEc8497b9999697127B742dd0523",
});

export default elecContract;
