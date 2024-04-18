import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AALogin } from "../wallet/wallet";
import { useContext, useEffect } from "react";
import UserContext from "../../contexts/user/userContext";
import { useActiveWalletConnectionStatus,useActiveAccount } from "thirdweb/react";
const userLogin = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/user/guidelines");
  };
  const status = useActiveWalletConnectionStatus();
  const acc= useActiveAccount();
  // useEffect(() => {
  //   setStatusHandler(stat);

  // }, []);
  useEffect(() => {
    console.log(status);
    console.log(acc);
  }, [status]);
  
  
  return (
    <>
      <div>
        <Button variant="outlined" onClick={handleLogin}>
          Login
        </Button>
        <AALogin/>
        {
          acc && <h1>address:{acc.address}</h1>
        }
      </div>
    </>
  );
};

export default userLogin;
