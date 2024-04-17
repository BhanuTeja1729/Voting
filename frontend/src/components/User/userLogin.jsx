import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AALogin } from "../wallet/wallet";

const userLogin = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/user/guidelines");
  };

  return (
    <>
      <div>
        <Button variant="outlined" onClick={handleLogin}>
          Login
        </Button>
        <AALogin/>
      </div>
    </>
  );
};

export default userLogin;
