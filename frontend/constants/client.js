 import { createThirdwebClient } from "thirdweb";

 const clientId= "1e82fffbabcdc68dea97a24b48555012";

  if (!clientId) {
    throw new Error("No Client ID provided. Please provide a Client ID in the .env file.");
  }

  export const client = createThirdwebClient(
    {clientId: clientId});