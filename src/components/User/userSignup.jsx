import { useState } from "react";
import { useNavigate } from "react-router-dom";

//Styles
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormControl,
  InputLabel,
  Stack,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import 'dayjs/locale/en-gb';
import dayjs from "dayjs";
// import { styled } from '@mui/material/styles';
// import { amber } from '@mui/material/colors';

// Icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const userSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(" ");
  const [voterId, setVoterId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  // Password Validation
  let hasSixChar = password.length >= 6;
  let hasLowerChar = /(.*[a-z].*)/.test(password);
  let hasUpperChar = /(.*[A-Z].*)/.test(password);
  let hasNumber = /(.*[0-9].*)/.test(password);
  let hasSpecialChar = /(.*[^a-zA-z0-9].*)/.test(password);

  //Button Color Style
  // const ColorButton = styled(Button)(({ theme }) => ({
  //   color: theme.palette.getContrastText(amber["500"]),
  //   backgroundColor: amber["500"],
  //   '&:hover': {
  //     backgroundColor: amber["900"],
  //   },
  // }));

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      console.log(
        firstName,
        lastName,
        dateOfBirth,
        voterId,
        phoneNumber,
        email,
        password
      );
      navigate('/user/login')

    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <h1 className="mb-8 text-center text-3xl font-semibold">
        Voter Registration
      </h1>
      <form>
        <Stack spacing={2} direction={"row"} sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="outlined"
            label="First Name"
            color="primary"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            required
          />

          <TextField
            type="text"
            variant="outlined"
            label="Last Name"
            color="primary"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
          />
        </Stack>
        <Stack spacing={2} direction={"row"} sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="outlined"
            color="primary"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />

          <TextField
            type="text"
            variant="outlined"
            color="primary"
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
            required
          />
        </Stack>
        {/* <TextField
          type="date"
          variant="outlined"
          label="Date Of Birth"
          color="primary"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          fullWidth
          required
          sx={{ mb: 4 }}
        /> */}
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
          <DatePicker sx={{mb: 4, width:"100%" }} value={dateOfBirth} onChange={(e) => {
            const date = dayjs(e).format("DD-MM-YYYY");
            setDateOfBirth(date);
          }}/>
        </LocalizationProvider>

        <TextField
          type="text"
          variant="outlined"
          label="Voter ID"
          color="primary"
          value={voterId}
          onChange={(e) => setVoterId(e.target.value)}
          fullWidth
          required
          sx={{ mb: 4 }}
        />
        <FormControl fullWidth color="primary">
          <InputLabel> Password</InputLabel>
          <OutlinedInput
            label="Password"
            value={password}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment>
                <IconButton
                  edge="end"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        {password && (
          <div className="ms-1" style={{ columns: 2 }}>
            <div>
              {hasSixChar ? (
                <span className="text-green-500">
                  <CheckCircleIcon className="mr-1" fontSize="small" />
                  <small> At Least 6 Characters</small>
                </span>
              ) : (
                <span className="text-red-500">
                  <CancelIcon className="mr-1" fontSize="small" />
                  <small> At Least 6 Characters</small>
                </span>
              )}
            </div>

            <div>
              {hasLowerChar ? (
                <span className="text-green-500">
                  <CheckCircleIcon className="mr-1" fontSize="small" />
                  <small> One Lowercase</small>
                </span>
              ) : (
                <span className="text-red-500">
                  <CancelIcon className="mr-1" fontSize="small" />
                  <small> One Lowercase</small>
                </span>
              )}
            </div>

            <div>
              {hasUpperChar ? (
                <span className="text-green-500">
                  <CheckCircleIcon className="mr-1" fontSize="small" />
                  <small> One Uppercase</small>
                </span>
              ) : (
                <span className="text-red-500">
                  <CancelIcon className="mr-1" fontSize="small" />
                  <small> One Uppercase</small>
                </span>
              )}
            </div>

            <div>
              {hasNumber ? (
                <span className="text-green-500">
                  <CheckCircleIcon className="mr-1" fontSize="small" />
                  <small> One Number</small>
                </span>
              ) : (
                <span className="text-red-500">
                  <CancelIcon className="mr-1" fontSize="small" />
                  <small> One Number</small>
                </span>
              )}
            </div>

            <div>
              {hasSpecialChar ? (
                <span className="text-green-500">
                  <CheckCircleIcon className="mr-1" fontSize="small" />
                  <small> One Special Symbol</small>
                </span>
              ) : (
                <span className="text-red-500">
                  <CancelIcon className="mr-1" fontSize="small" />
                  <small> One Special Symbol</small>
                </span>
              )}
            </div>
          </div>
        )}
      </form>
      <div className="mt-6 justify-center items-center">
        <Button
          variant="contained"
          fullWidth
          color="primary"
          disabled={
            !firstName ||
            !email ||
            !phoneNumber ||
            !dateOfBirth ||
            !voterId ||
            !password ||
            !hasSixChar ||
            !hasLowerChar ||
            !hasUpperChar ||
            !hasNumber ||
            !hasSpecialChar
          }
          sx={{ borderRadius: 5 }}
          onClick={submitHandler}
        >
          REGISTER
        </Button>
      </div>
    </>
  );
};

export default userSignup;
