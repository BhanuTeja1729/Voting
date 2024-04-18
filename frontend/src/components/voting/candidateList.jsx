import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import CountdownTimer from "./countdownTimer";
import FaceRecognition from "./faceRecognition";
import UserContext from "../../contexts/user/userContext";
import { useActiveWalletConnectionStatus } from "thirdweb/react";

const candidateList = () => {
  const navigate = useNavigate();
  const handleTimerEnd = () => {
    // alert("Timer Ended!");
  };

  const handleVote = () => {
    alert("Vote Casted");
    navigate("/user/guidelines");
  };

  const cardData = [
    {
      id: 1,
      img: "https://pbs.twimg.com/profile_images/1700051019525488640/VRqy0bTE_400x400.jpg",
      name: "Narendra Modi",
      party: "Bharatiya Janatha Party",
    },
    {
      id: 2,
      img: "https://pbs.twimg.com/profile_images/1700051019525488640/VRqy0bTE_400x400.jpg",
      name: "Narendra Modi",
      party: "Bharatiya Janatha Party",
    },
    {
      id: 3,
      img: "https://pbs.twimg.com/profile_images/1700051019525488640/VRqy0bTE_400x400.jpg",
      name: "Narendra Modi",
      party: "Bharatiya Janatha Party",
    },
    {
      id: 4,
      img: "https://pbs.twimg.com/profile_images/1700051019525488640/VRqy0bTE_400x400.jpg",
      name: "Narendra Modi",
      party: "Bharatiya Janatha Party",
    },
    {
      id: 5,
      img: "https://pbs.twimg.com/profile_images/1700051019525488640/VRqy0bTE_400x400.jpg",
      name: "Narendra Modi",
      party: "Bharatiya Janatha Party",
    },
    {
      id: 6,
      img: "https://pbs.twimg.com/profile_images/1700051019525488640/VRqy0bTE_400x400.jpg",
      name: "Narendra Modi",
      party: "Bharatiya Janatha Party",
    },
    {
      id: 7,
      img: "https://pbs.twimg.com/profile_images/1700051019525488640/VRqy0bTE_400x400.jpg",
      name: "Narendra Modi",
      party: "Bharatiya Janatha Party",
    },
  ];

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
            <div>Messages</div>
            <div>Messages</div>
          </div>

          <Box
            sx={{
              maxHeight: "15%",
              maxWidth: "15%",
              justifySelf: "flex-end",
              p: 1,
            }}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSQ_-60wxOuaV2Ql3ebKHF6YFHjKcSwne4j0x0-RjVgg&s"
              alt="Meow"
            />
            {/* <FaceRecognition /> */}
          </Box>
        </Stack>

        <Box
          sx={{
            mt: 8,
            mb:6,
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
            {cardData.map((card) => (
              <Card key={card.id} sx={{ width: "15%" }}>
                <CardContent sx={{ marginBottom: "1rem" }}>
                  <Stack spacing={2} direction="column">
                    <CardMedia
                      title={card.name}
                      image={card.img}
                      component="img"
                      sx={{ maxHeight: 200, maxWidth: 230 }}
                    />
                    <div className="text-xl font-medium">{card.name}</div>
                    <div className="text-xl font-medium">{card.party}</div>
                    <div>
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ width: "100%" }}
                        onClick={handleVote}
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
