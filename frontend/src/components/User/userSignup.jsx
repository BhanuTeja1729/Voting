/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

//Styles
import { Button, TextField, Stack } from "@mui/material";

import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import UserContext from "../../contexts/user/userContext";

//api functions
import { create } from "../../api/voter";

const userSignup = () => {

  const userContext = useContext(UserContext);
  const {uploadFile} = userContext;

  const [voterFirstName, setFirstName] = useState("");
  const [voterLastName, setLastName] = useState("");
  const [voterId, setVoterId] = useState("");
  const [email, setEmail] = useState("");
  const [aadharNumber, setAadhar] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [img, setImg] = useState(null);

  const navigate = useNavigate();

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
      const imgUrl = await uploadFile("image", voterFirstName, voterLastName, img);
      try {
        const res = await create({
          voterFirstName,
          voterLastName,
          email,
          phoneNumber,
          voterId,
          aadharNumber,
          imgUrl,
        });
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
