import { createThirdwebClient } from "thirdweb";

const client = createThirdwebClient({
  clientId: import.meta.env.VITE_APP_THIRDWEB_CLIENT_ID,
});
export default client;