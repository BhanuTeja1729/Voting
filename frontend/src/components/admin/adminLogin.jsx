import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import adminImage from "/admin.jpeg";
import { login } from "../../api/admin";
//Material Comps
import {
  Stack,
  TextField,
  Button,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Box,
} from "@mui/material";

//Icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";

const adminLogin = () => {
  const navigate = useNavigate();

  //Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const res = await login(email, password);
        if (res.error) {
            toast.error(res.error);
        } else {
            toast.success(" Login Successful ");
            localStorage.setItem('jwt', res.token); // Store the JWT token in local storage
            navigate("/admin/dashboard");
        }
    } catch (error) {
        toast.error(error);
    }
};


  return (
    <>
      <div className="flex justify-center items-center">
        <div className="container w-full mt-20 flex flex-col md:flex-row bg-white shadow-md rounded-xl px-5 py-5 ">
          <div className="flex-1">
            <img
              src={adminImage}
              alt="Admin"
              className="w-full h-auto rounded-xl md:rounded-l-xl"
            />
          </div>

          <div className="flex-1 p-8 flex justify-center items-center bg-gray">
            <div>
              <h1 className="mb-8 text-center text-4xl font-semibold">
                Admin Login
              </h1>
              <Box sx={{ width: "100%" }}>
                <Stack spacing={2}>
                  <TextField
                    type="text"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    color="secondary"
                    sx={{ marginBottom: 4 }}
                  />
                  <FormControl>
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput
                      label="password"
                      value={password}
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <Button
                    variant="contained"
                    label="Login"
                    fullWidth
                    color="error"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                </Stack>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default adminLogin;
