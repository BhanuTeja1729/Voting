import { useContext, useEffect, useState } from "react";
import React from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import AdminContext from "../../contexts/admin/adminContext";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { create } from "../../api/admin";
import CandidateCard from "./candidateCard";

//contracts
import { useActiveAccount} from 'thirdweb/react'

const candidate = () => {
  const adminContext = useContext(AdminContext);
  const { candidateList, getCandidateList, addCandidate, uploadFile } =
    adminContext;

  const account = useActiveAccount();

  useEffect(() => {
    getCandidateList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const candidates = candidateList;
  const [candidateFirstName, setCandidateFirstName] = useState("");
  const [candidateLastName, setCandidateLastName] = useState("");
  const [wardNo, setWardNo] = useState("");
  const [party, setParty] = useState("");
  const [img, setImg] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(candidateFirstName, candidateLastName, wardNo, party);
    try {
      const imgUrl = await uploadFile(
        "image",
        candidateFirstName,
        candidateLastName,
        img
      );

      const _name = candidateFirstName + " " + candidateLastName;
      const _election_id = 1;
      const _ward_no = wardNo;
      const _imgUrl = imgUrl;
      const _party = party;

   
      const props = { _name, _election_id, _ward_no, _imgUrl, _party };

      let add = await addCandidate(props);
      if (add) {
        try {
          const res = await create(
            candidateFirstName,
            candidateLastName,
            wardNo,
            party,
            imgUrl
          );
          console.log(res);
          if (res.error) {
            console.error(res.error);
          } else {
            console.log(res.message);
            //Refresh Page
            getCandidateList();
          }
        } catch (error) {
          console.error("Candidate Not Registered on database");
          console.error(error);
        }
      }
    } catch (error) {
      console.log(error);
      console.log(
        "Candidate Not Registered either blockchain error or cloudinary"
      );
    }
  };

  const options = [
    { value: "Party 1", label: "Party 1" },
    { value: "Party 2", label: "Party 2" },
    { value: "Party 3", label: "Party 3" },
  ];
  return (
    <>
      <Box
        sx={{ mx: 5, mt: 12, mb: 2, overflow: "hidden", maxHeight: "100vh" }}
      >
        {/* <h1 className="mb-8 text-3xl font-semibold">Candidate</h1> */}
        {account && (
          <div className="shadow w-4/5">
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                <div className="text-3xl font-semibold">
                  Register Candidates
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                  <TextField
                    type="text"
                    variant="outlined"
                    color="secondary"
                    label="First Name"
                    onChange={(e) => setCandidateFirstName(e.target.value)}
                    value={candidateFirstName}
                    fullWidth
                    required
                  />
                  <TextField
                    type="text"
                    variant="outlined"
                    color="secondary"
                    label="Last Name"
                    onChange={(e) => setCandidateLastName(e.target.value)}
                    value={candidateLastName}
                    fullWidth
                    required
                  />
                </Stack>
                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                  <TextField
                    type="text"
                    variant="outlined"
                    color="secondary"
                    label="Ward. No"
                    onChange={(e) => setWardNo(e.target.value)}
                    value={wardNo}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                  />
                  <Box sx={{ mb: 8 }}>
                    <FormControl fullWidth>
                      <InputLabel>Election Id</InputLabel>
                      <Select
                        value={party}
                        label="Party"
                        onChange={(e) => setParty(e.target.value)}
                      >
                        {options.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Stack>

                <Box sx={{ mb: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel>Party</InputLabel>
                    <Select
                      value={party}
                      label="Party"
                      onChange={(e) => setParty(e.target.value)}
                    >
                      {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ justifyContent: "space-between", display: "flex" }}>
                  <Button variant="contained" component="label">
                    Upload File
                    <input
                      type="file"
                      hidden
                      onChange={(e) => setImg(e.target.files[0])}
                    />
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ mr: 1.5 }}
                    onClick={handleRegister}
                  >
                    Register
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>
          </div>
        )}
        <div className="ml-5 my-5 text-3xl font-semibold">
          <Typography variant="">Registered Candidates</Typography>
        </div>
        {/* {console.log(candidates)} */}

        <Box sx={{ overflowY: "auto", maxHeight: "36vh", p: 3 }}>
          {Array.isArray(candidates) &&
            candidates.map((candidates) => {
              return (
                <CandidateCard candidate={candidates} key={candidates._id} />
              );
            })}
        </Box>
      </Box>
    </>
  );
};

export default candidate;
