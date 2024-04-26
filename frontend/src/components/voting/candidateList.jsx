
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Card, CardContent, CardMedia, Button } from "@mui/material";
import CountdownTimer from "./countdownTimer";
import FaceRecognitionComponent from "./faceRecognition";

import UserContext from "../../contexts/user/userContext";


const candidateList = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const {
    user,
    message,
    candidateList,
    updateVoter,
    updateVoterStatus,
    getCandidateDetails,
  } = userContext;

  const handleTimerEnd = () => {
    alert("Timer Ended!");
    navigate("/user/guidelines");
  };


  const handleVote = async (candidate) => {
    const props={candidate};
    let res=await updateVoter(props);
    if(res){
      let res2 = await updateVoterStatus();
      if(res2){
       alert("Vote Casted");
       navigate("/user/guidelines")
      }
    }
  };
  
  return (
    <>
      <Box sx={{ maxWidth: "100%", p: 3 }}>
        <Stack
          direction={"row"}
          sx={{
            justifyContent: "space-between",
            display: "flex",
            boxShadow: 1,
          }}
        >
          <div className="ml-0 p-6">
            <div className="mb-2 text-center text-2xl font-medium">
              Time Remaining!!
            </div>
            <CountdownTimer startTime={3} onTimerEnd={handleTimerEnd} />
          </div>
          <div className="p-12 text-center text-2xl font-medium">
            <Box sx={{ mt: 3 }}>{message}</Box>
          </div>

          <Box
            sx={{
              maxHeight: "15%",
              maxWidth: "15%",
              justifySelf: "flex-end",
              p: 1,
            }}
          >
            <FaceRecognitionComponent imgUrl={user.imgUrl} />
          </Box>
        </Stack>

        <Box
          sx={{
            mt: 8,
            mb: 6,
            boxShadow: 1,
            padding: 2,
            maxHeight: "calc(100vh - 420px)",
            overflow: "auto",
          }}
        >
          <Stack
            spacing={3}
            direction="row"
            sx={{ justifyContent: "space-between" }}
            useFlexGap
            flexWrap="wrap"
          >
            
            {candidateList.map((candidate) => (
              <Card key={candidate.name} sx={{ width: "15%" }}>
                <CardContent sx={{ marginBottom: "1rem" }}>
                  <Stack spacing={2} direction="column">
                    <CardMedia
                      title={candidate.name}
                      image={candidate.imageUrl}
                      component="img"
                      sx={{ maxHeight: 200, maxWidth: 230 }}
                    />
                    <div className="text-xl font-medium">{candidate.name}</div>
                    <div className="text-xl font-medium">
                      {candidate.partyNo}
                    </div>
                    <div>
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ width: "100%" }}
                        onClick={() => handleVote(candidate)}
                      >
                        Vote
                      </Button>
                    </div>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default candidateList;
