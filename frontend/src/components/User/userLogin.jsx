import { Button, Stack, Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AALogin } from "../wallet/wallet";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/user/userContext";
import {
  useActiveWalletConnectionStatus,
  useActiveAccount,
} from "thirdweb/react";

//api functions
import { login } from "../../api/voter";

const userLogin = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const { status, setStatusHandler } = userContext;

  const [email, setEmail] = useState("");
  const [voterId, setVoterId] = useState("");
  const [proceed, setProceed] = useState(false);
  const [msg, setMsg] = useState(false);

  const handleProceed = async () => {
    // try {
    //   const res = await login(email, voterId);
    //   if (res && res.error) {
    //     console.error(res.error);
    //     setMsg(true);
    //   } else {
    //     console.log(res.message);
    setProceed(!proceed);
    //   }
    // } catch (err) {
    //   console.error(err.message);
    // }

  };
  const stat = useActiveWalletConnectionStatus();
  const acc = useActiveAccount();

  useEffect(() => {
    setStatusHandler(stat);
    // console.log(stat)
  }, [stat]);

  if (status) {
    navigate("/user/guidelines");
  }

  return (
    <>
      <div>
        <Stack
          spacing={5}
          direction={"column"}
          sx={{ boxShadow: 1, padding: 5 }}
        >
          <Box boxShadow={1} padding={5} sx={{ justifyContent: "center" }}>
            <div className="text-3xl font-medium mb-4 text-center">Login</div>
            <TextField
              type="email"
              variant="outlined"
              label="Registered Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={{ marginBottom: 3 }}
            />
            <TextField
              type="text"
              variant="outlined"
              label="Voter ID"
              value={voterId}
              onChange={(e) => setVoterId(e.target.value)}
              fullWidth
              sx={{ marginBottom: 3 }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: 1 }}
              onClick={handleProceed}
            >
              Proceed
            </Button>
          </Box>
          {proceed ? (
            <Box>
              <AALogin />
            </Box>
          ) : (
            ""
          )}
        </Stack>

        {/* {acc && <h1>address:{acc.address}</h1>} */}
      </div>
    </>
  );
};

export default userLogin;
