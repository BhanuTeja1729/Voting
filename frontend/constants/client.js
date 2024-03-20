 import { createThirdwebClient } from "thirdweb";

 const clientId= import.meta.env.VITE_APP_THIRDWEB_CLIENT_ID;

  if (!clientId) {
    throw new Error("No Client ID provided. Please provide a Client ID in the .env file.");
  }

  export const client = createThirdwebClient({
    clientId: clientId,
  });