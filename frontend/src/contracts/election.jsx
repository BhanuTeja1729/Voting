import { getContract } from "thirdweb";
import client from "../thirdweb/client.js";
import chain from "../thirdweb/chain.js";

// get a contract
const elecContract = getContract({
  client,
  chain: chain,
  address: "0x7F6eFCA4Cb36C87df835861654c8070A09B26DB5",
});

export default elecContract;
