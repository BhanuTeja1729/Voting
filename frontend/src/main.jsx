
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThirdwebProvider, embeddedWalletConfig } from "thirdweb/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThirdwebProvider
  client={import.meta.env.REACT_APP_THIRDWEB_CLIENT}
  wallets={[
    embeddedWalletConfig(),
  ]}
  >
    <App />
  </ThirdwebProvider>
);
