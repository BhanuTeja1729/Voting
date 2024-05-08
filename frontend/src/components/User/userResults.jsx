import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/user/userContext";
import AdminContext from "../../contexts/admin/adminContext";
import { useActiveWalletConnectionStatus } from "thirdweb/react";
import { Button, Box, Card, CardActionArea, Stack, CardContent, Divider, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function Candidate({ name, imageUrl, votes }) {
  return (

    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <div className="text-center text-2xl font-semibold mb-4">
          <img src="/user.jpeg" alt="" />
        </div>
        <Divider />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <Box component="section" sx={{ textAlign: "center", fontSize: 18, fontWeight: "medium", width: "100%" }}>Candidate Name : Name</Box>
            <Box component="section" sx={{ textAlign: "center", fontSize: 18, fontWeight: "normal", width: "100%" }}>No. of Votes : Votes</Box>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

  );
}

const userResults = () => {
  let userContext = useContext(UserContext);
  let navigate = useNavigate();

  useEffect(() => {
    getCandidateList();
  }, []);

  const [_wardNo, setWardNo] = useState(null);
  const [showResultByWard, setShowResultByWard] = useState(false);

  const stat = useActiveWalletConnectionStatus();
  const {  setStatusHandler, getCandidateList, getVoteCountsByWard, wardNos, resultsByWard } = userContext;


  useEffect(() => {
    if (stat == "disconnected") {
      setStatusHandler(stat);
      navigate("/");
    }
  }, [stat]);


  console.log(wardNos)

  let wardNoOptions = [];
  if (wardNos !== undefined) {

    for (let i = 0; i < wardNos.length; i++) {
      // Create an object to hold the values from each array
      let obj = {
        value: wardNos[i],
        label: wardNos[i],
      };
      wardNoOptions.push(obj);
    }
  }

  const fetchVotesByWard = () => {
    setShowResultByWard(true);
    getVoteCountsByWard(_wardNo);
  }

  return (
    <>
      <div className="text-2xl font-medium mb-8">
        Fetch Results By Ward
      </div>
      
        <div>
          <Box sx={{ maxWidth: "50%", alignItems: "center", margin: "auto", mb: 5 }}>

            <Box sx={{ mb: 2, width: "100%" }}>
              <FormControl fullWidth>
                <InputLabel>Ward No</InputLabel>
                <Select
                  value={_wardNo}
                  label="Ward No"
                  onChange={(e) => setWardNo(e.target.value)}
                >
                  {wardNoOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Button variant="contained" onClick={fetchVotesByWard}>
              Fetch
            </Button>
          </Box>

          {
            showResultByWard && (
              <div>

                <div className='text-2xl font-medium'>
                  Results For Ward Number {_wardNo}
                </div>

                <Stack spacing={3} marginTop={2} direction="row" useFlexGap flexWrap="wrap" marginBottom={5}>

                  {resultsByWard && resultsByWard.map((candidate, index) => (

                    <Card key={index} sx={{ maxWidth: 200 }}>
                      <div className=" text-2xl font-semibold">
                        <img src={candidate.imageUrl} alt={candidate.names} height={200} width={200} /> {/* Use candidate.imageUrl and candidate.names */}
                      </div>
                      <Divider />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          <Box component="section" sx={{ fontSize: 18, fontWeight: "medium", width: "100%" }}>
                            Name: {candidate.names}
                          </Box>
                          <Box component="section" sx={{ fontSize: 18, fontWeight: "normal", width: "100%" }}>
                            Votes: {candidate.votes.toString()}
                          </Box>
                        </Typography>
                      </CardContent>
                    </Card>

                  ))}
                </Stack>
              </div>
            )
          }
        </div>

    </>
  )
};

export default userResults;
