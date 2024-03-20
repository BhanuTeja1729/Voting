import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//Styles
import { Button, TextField, Stack } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en-gb";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import { amber } from '@mui/material/colors';

//api functions
import { create } from "../../api/voter";

const userSignup = () => {
  const [voterFirstName, setFirstName] = useState("");
  const [voterLastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [voterId, setVoterId] = useState("");
  const [email, setEmail] = useState("");
  const [aadharNumber, setAadhar] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [img, setImg] = useState(null);


  const navigate = useNavigate();

  //Button Color Style
  // const ColorButton = styled(Button)(({ theme }) => ({
  //   color: theme.palette.getContrastText(amber["500"]),
  //   backgroundColor: amber["500"],
  //   '&:hover': {
  //     backgroundColor: amber["900"],
  //   },
  // }));

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imgUrl = await uploadFile("image", voterFirstName, voterLastName);

      // Collect form data
      

      try {
        const res = await create(formData);
        if (res.error) {
          console.error(res.error);
        } else {
          console.log(res.message);
          // Redirect to login after successful registration
          navigate("/user/login");
        }
      } catch (err) {
        console.error(err);
      }
    } catch (error) {
      alert(error);
    }
  };

  const uploadFile = async (type, firstName, lastName) => {
    const data = new FormData();
    data.append("file", type === "image" ? img : null);
    data.append("upload_preset", type === "image" ? "image_preset" : null);

    // Rename the file
    const fileName = `${firstName}_${lastName}`;
    data.append("public_id", fileName);

    try {
      const resourceType = "image";
      const cloudName = "dcpajsgwj";
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      return secure_url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="mb-8 text-center text-3xl font-semibold">
        Voter Registration
      </h1>

      <Stack spacing={2} direction={"row"} sx={{ marginBottom: 4 }}>
        <TextField
          type="text"
          variant="outlined"
          label="First Name"
          color="primary"
          value={voterFirstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          required
        />

        <TextField
          type="text"
          variant="outlined"
          label="Last Name"
          color="primary"
          value={voterLastName}
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

      <LocalizationProvider
        color="primary"
        dateAdapter={AdapterDayjs}
        adapterLocale={"en-gb"}
      >
        <DatePicker
          sx={{ mb: 4, width: "100%" }}
          value={dateOfBirth}
          onChange={(e) => {
            const date = dayjs(e).format("DD-MM-YYYY");
            setDateOfBirth(date);
          }}
        />
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
        value={aadharNumber}
        onChange={(e) => setAadhar(e.target.value)}
        fullWidth
        required
        sx={{ mb: 4 }}
      />

      <div>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput
            type="file"
            onChange={(e) => {
              setImg(e.target.files[0]);
            }}
          />
        </Button>
        {img && (
          <div className="text-lg mt-1 font-semibold">
            Selected File: {img.name}
          </div>
        )}
      </div>
      <div className="mt-6 justify-center items-center">
        <Button
          variant="contained"
          fullWidth
          color="primary"
          disabled={
            !voterFirstName ||
            !email ||
            !phoneNumber ||
            !dateOfBirth ||
            !voterId ||
            !aadharNumber
          }
          sx={{ borderRadius: 5 }}
          onClick={handleSubmit}
        >
          REGISTER
        </Button>
      </div>
    </>
  );
};

export default userSignup;
