import { inAppWallet } from "thirdweb/wallets";
import { ConnectButton } from "thirdweb/react";
import  chain  from "../../thirdweb/chain";
import client from "../../thirdweb/client";
const wallets = [inAppWallet({
  auth:{
    options:["email"],
  }
})];

const accountAbstraction = {
  chain: chain,
  factoryAddress: import.meta.env.VITE_APP_THIRDWEB_FACTORY_ADDRESS,
  gasless: true,
};

export const AALogin = () => {
  return (
    <div>
      <ConnectButton
        wallets={wallets}
        client={client}
        chain={chain}
        accountAbstraction={accountAbstraction}
        connectButton={{
          label: "Continue",
        }}
        connectModal={{
          showThirdwebBranding:false,
        }}
      />
    </div>
  );
};
