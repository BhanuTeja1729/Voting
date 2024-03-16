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



const userSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [voterId, setVoterId] = useState("");
  const [email, setEmail] = useState("");
  const [aadhar, setAadhar] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

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
        aadhar
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
        
        <LocalizationProvider color="primary" dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
          <DatePicker  sx={{mb: 4, width:"100%" }} value={dateOfBirth} onChange={(e) => {
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

<TextField
          type="text"
          variant="outlined"
          label="Aadhar No."
          color="primary"
          value={aadhar}
          onChange={(e) => setAadhar(e.target.value)}
          fullWidth
          required
          sx={{ mb: 4 }}
        />
        
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
            !aadhar
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
