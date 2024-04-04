import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import { Box, Button } from "@mui/material";
import {alpha}from "@mui/material/styles"

const userElections = () => {
  const [election, setElection] = useState(true);
  const navigate = useNavigate();
  const handleVote = (e)=>{
    e.preventDefault();

    navigate("/voting/candidates")
  }

  return (
    <>
      <div className="my-6 font-semibold text-3xl">Elections</div>
      {election ? (
        <div>
          <Box
            sx={{
              boxShadow: 3,
              maxWidth: "100%",
              marginRight: 17,
              padding: 4,
              my: 3,
              display: "flex",
              justifyContent: "space-around",
              backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/029/593/602/non_2x/abstract-background-with-a-gradient-of-a-colorful-background-vector.jpg')",
              backgroundRepeat: "no-repeat",
             
            }}
          >
            <Box
              sx={{
                boxShadow: 3,
                width: "25%",
                height: 500,
                padding: 3,
                my: 3,
                backgroundColor:"rgba(255, 255, 255, 0.4)",
                borderRadius: 4
              }}
            >
              <div className=" text-center text-3xl font-semibold mt-4">Election Name</div>
              <img
                src="https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067_640.png"
                alt="img"
                width={"100%"}
                height={"25%"}
                className="my-4"
              />
              <div className="text-xl font-medium p-5">
              <div>Location</div>
              <div>Date</div>
              <div>Time</div>
              </div>
              <Button variant="contained" color="success" sx={{width:"75%",mx:4, }} onClick={handleVote}>
                <div className="text-white-600 text-lg ">
                  Vote
                </div>
              </Button>
            </Box>
          </Box>
        </div>
      ) : (
        <Box
          sx={{
            boxShadow: 3,
            maxWidth: "100%",
            padding: 4,
            my: 3,
          }}
        >
          No Elections Currently
        </Box>
      )}
    </>
  );
};

export default userElections;
