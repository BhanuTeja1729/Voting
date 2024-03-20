
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThirdwebProvider } from "../constants/thirdweb.js";
import { client } from "../constants/client.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThirdwebProvider 
    client={client}
  >
    <App />
  </ThirdwebProvider>
);
