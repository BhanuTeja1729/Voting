import { inAppWallet } from "thirdweb/wallets";
import { ConnectButton } from "thirdweb/react";
import  myChain  from "../../thirdweb/chain";
import client from "../../thirdweb/client";
const wallets = [inAppWallet({
  auth:{
    options:["email"],
  }
})];

const accountAbstraction = {
  chain: myChain,
  factoryAddress: import.meta.env.VITE_APP_THIRDWEB_FACTORY_ADDRESS,
  gasless: true,
};

export const AALogin = () => {
  return (
    <div>
      <ConnectButton
        wallets={wallets}
        client={client}
        chain={myChain}
        accountAbstraction={accountAbstraction}
        connectButton={{
          label: "Enter Registered Email",
        }}
        connectModal={{
          showThirdwebBranding:false,
        }}
      />
    </div>
  );
};
