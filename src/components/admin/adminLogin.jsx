import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import adminImage from "/admin.jpeg"

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

const adminLogin = () => {
  const navigate = useNavigate();

  //Form States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const adminUsername = "Admin";
  const adminPassword = "@Admin123";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      //   console.log("Logged In Successfully");
      // Login Api
      if (username == adminUsername && password == adminPassword)
        navigate("/admin/dashboard");
      else alert("Invalid Credentials");
    } catch (error) {
      console.error(error);
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
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                        <InputAdornment>
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
