import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  ThirdwebProvider,
  smartWalletConfig,
  embeddedWalletConfig,
  metamaskConfig
} from "../constants/thirdweb.js";

import { client } from "../constants/client.js";

const smartWalletOptions = {
  factoryAddress: "0x1C2721731C7CAEc8497b9999697127B742dd0523",
  gasless: true,
};


ReactDOM.createRoot(document.getElementById("root")).render(
  <>


  <ThirdwebProvider
    clientId={client}
    activeChain="mumbai"
    supportedWallets={[
      smartWalletConfig(
        metamaskConfig({ recommended: true }),
        smartWalletOptions,
      ),
      smartWalletConfig(
        embeddedWalletConfig(),
        smartWalletOptions,
      ),
    ]}
  >
    <App />
  </ThirdwebProvider>
  </>

);
