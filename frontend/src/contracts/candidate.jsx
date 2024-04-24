import { getContract } from "thirdweb";
import client from "../thirdweb/client.js";
import chain from "../thirdweb/chain.js";

// get a contract
const candContract = getContract({
  client,
  chain: chain,
  address: "0x9fA749936f4770bB7D5dcfb8cFf27B31c5bb3d48",
});


export default candContract;


