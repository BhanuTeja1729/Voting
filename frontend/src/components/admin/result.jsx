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
  Stack,
  Tabs,
  Tab,
} from "@mui/material";

import { TabPanel, TabList, TabContext } from "@mui/lab"

//contracts
import AdminContext from '../../contexts/admin/adminContext';


function Candidate({ name, imageUrl, votes }) {
  return (
    // <div>
    //   <h2>{name}</h2>
    //   <img src={imageUrl} alt={name} style={{ width: '200px', height: '200px' }} />
    //   <p>Votes:{votes}</p>
    // </div>

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


  const adminContext = useContext(AdminContext);
  const { getCandidateDetailsByElectionId, getVoteCounts, result } = adminContext;

  useEffect(() => {
    // getCandidateDetailsByElectionId("101");
    let _electionId = "101"
    const props = { _electionId }
    getVoteCounts(props);
  }, []);

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
              {console.log(result)}
              <Stack spacing={3} direction="row" useFlexGap flexWrap="wrap" marginBottom={5}>
                {result && result.map((candidate, index) => (

                  <Card key={index} sx={{ maxWidth: 200 }}>
                    <div className="text-center text-2xl font-semibold">
                      <img src={candidate.imageUrl} alt={candidate.names} height={200} width={200} /> {/* Use candidate.imageUrl and candidate.names */}
                    </div>
                    <Divider />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        <Box component="section" sx={{ textAlign: "center", fontSize: 18, fontWeight: "medium", width: "100%" }}>
                          Name: {candidate.names} {/* Use candidate.names */}
                        </Box>
                        <Box component="section" sx={{ textAlign: "center", fontSize: 18, fontWeight: "medium", width: "100%" }}>
                          Party: {candidate.party} {/* Use candidate.names */}
                        </Box>
                        <Box component="section" sx={{ textAlign: "center", fontSize: 18, fontWeight: "medium", width: "100%" }}>
                          Ward: {candidate.ward} {/* Use candidate.names */}
                        </Box>
                        <Box component="section" sx={{ textAlign: "center", fontSize: 18, fontWeight: "normal", width: "100%" }}>
                          {/* Votes: {candidate.votes.toString()} Convert BigInt to string */} Votes: 15
                        </Box>
                      </Typography>
                    </CardContent>
                  </Card>

                ))}
              </Stack>
            </div>
          </TabPanel>
          <TabPanel value="2">Work In Progress</TabPanel>
        </TabContext>
      </Box>
    </>
  )
}

export default result