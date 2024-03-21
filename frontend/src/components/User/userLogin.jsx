import {
  ConnectButton
} from "../../../constants/thirdweb";
import {
  chainId 
} from "../../../constants/chains";
const userLogin = () => {
  return (
    <div>
      <ConnectButton chain={chainId}  />
    </div>
  );
};

export default userLogin;
