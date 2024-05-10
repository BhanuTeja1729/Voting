import { Button, Stack, Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AALogin } from "../wallet/wallet";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/user/userContext";
import { toast } from "react-toastify";
import {
  useActiveWalletConnectionStatus,
  useActiveAccount,
} from "thirdweb/react";

//contracts
import voterContract from "../../contracts/voter";
import { readContract, resolveMethod } from "thirdweb";

//api functions
import { login } from "../../api/voter";

const userLogin = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const { status, setStatusHandler, returnVoter, user } = userContext;

  const [email, setEmail] = useState("");
  const [voterId, setVoterId] = useState("");
  const [proceed, setProceed] = useState(false);
  const [msg, setMsg] = useState(false);

  const handleProceed = async () => {
    try {
        const data = await readContract({
            contract: voterContract,
            method: resolveMethod("checkVoter"),
            params: [voterId, email]
        });

        if (data) {
            await returnVoter(voterId); // Wait for returnVoter to finish
            // console.log(user); // This will log the updated user state
            setProceed(!proceed);
            toast.success("Connect to Wallet")
        } else {
            toast.error("Login With Proper Credentials");
        }
    } catch (error) {
        toast.error(error);
    }
};


  const stat = useActiveWalletConnectionStatus();
  const acc = useActiveAccount();

  useEffect(() => {
    setStatusHandler(stat);
    // console.log(stat)
  }, [stat]);

  useEffect(() => {
    console.log(user); // This will log the updated user state
  }, [user]);

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
