import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const userLogin = () => {
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
      </div>
    </>
  );
};

export default userLogin;
