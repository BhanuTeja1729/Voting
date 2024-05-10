import React, { useContext, useEffect, useState } from 'react'

import {
  Card,
  CardContent,
  Box,
  Divider,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  MenuItem,
  Stack,
  FormControl,
  Select,
  InputLabel,
  Tab,
} from "@mui/material";
import elecContract from "../../contracts/election";
import { TabPanel, TabList, TabContext } from "@mui/lab"
import { readContract, resolveMethod } from "thirdweb";

//contracts
import AdminContext from '../../contexts/admin/adminContext';


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




const result = () => {

  const [value, setValue] = useState("1");
  const [_electionId, setElectionId] = useState(null);
  const [_wardNo, setWardNo] = useState(null);
  const [showResultByElection, setShowResultByElection] = useState(false);
  const [showResultByWard, setShowResultByWard] = useState(false);

  const adminContext = useContext(AdminContext);
  const { getCandidateList, getVoteCountsByEid, activateResults, deactivateResults, publishResult, getVoteCountsByWard, resultByE, resultByW, electionList, setElectionList, wardNos } = adminContext;


  const getElectionList = async () => {
    const data = await readContract({
      contract: elecContract,
      method: resolveMethod("getElectionDetails"),
      params: [],
    });
    setElectionList(data);
  };

  let electionIdOptions = [];
  if (electionList[0] !== undefined) {

    for (let i = 0; i < electionList[0].length; i++) {
      // Create an object to hold the values from each array
      let obj = {
        value: electionList[0][i],
        label: electionList[0][i],
      };
      electionIdOptions.push(obj);
    }
  }


  let wardNoOptions = [];
  if (wardNos[0] !== undefined) {

    for (let i = 0; i < wardNos.length; i++) {
      // Create an object to hold the values from each array
      let obj = {
        value: wardNos[i],
        label: wardNos[i],
      };
      wardNoOptions.push(obj);
    }
  }



  useEffect(() => {
    getElectionList();
  }, []);



  const fetchVotesByEid = async () => {
    setShowResultByElection(true);
    getVoteCountsByEid(_electionId);
    getCandidateList(_electionId);
  }

  const fetchVotesByWard = async () => {
    setShowResultByWard(true);
    getVoteCountsByWard(_wardNo);
  }

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <>


      <Box sx={{ width: '103%', mt: 10, ml: -5, }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleTabChange} aria-label="lab API tabs example" centered >
              <Tab label="Election Based " value="1" fullwidth />
              <Tab label="Ward Based" value="2" fullwidth />
             
            </TabList>
          </Box>
          <TabPanel value="1">
            <div className='text-2xl font-medium'>
              <Box sx={{ maxWidth: "50%", alignItems: "center", margin: "auto", mb: 2 }}>
                <Box sx={{ mb: 2, width: "100%" }}>
                  <FormControl fullWidth>
                    <InputLabel>Election Id</InputLabel>
                    <Select
                      value={_electionId}
                      label="Election Id"
                      onChange={(e) => setElectionId(e.target.value)}
                    >
                      {electionIdOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Button variant="contained" onClick={fetchVotesByEid}>
                  Fetch
                </Button>


              </Box>

              {
                showResultByElection && wardNos !== null && (
                  <div>

                    Results For Election {_electionId}

                    <Stack spacing={3} marginTop={2} direction="row" useFlexGap flexWrap="wrap" marginBottom={5}>

                      {resultByE && resultByE.map((candidate, index) => (

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
                              <Box component="section" sx={{ fontSize: 18, fontWeight: "medium", width: "100%" }}>
                                Party: {candidate.party}
                              </Box>
                              <Box component="section" sx={{ fontSize: 18, fontWeight: "medium", width: "100%" }}>
                                Ward: {candidate.ward} {/* Use candidate.names */}
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
          </TabPanel>
          <TabPanel value="2"><Box sx={{ maxWidth: "50%", alignItems: "center", margin: "auto", mb: 2 }}>
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

                    {resultByW && resultByW.map((candidate, index) => (

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
          </TabPanel>
        </TabContext>
      </Box>
    </>
  )
}

export default result