import React, { useState, useEffect } from "react";
import { Typography, Box, Divider, Stack } from "@mui/material";
import SemicolonIcon from "./semicolon";

const CountdownTimer = ({ startTime, onTimerEnd }) => {
  const [timeRemaining, setTimeRemaining] = useState(startTime * 60); // Convert minutes to seconds

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(intervalId);
          if (onTimerEnd) {
            onTimerEnd();
          }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // Update timer every second

    return () => clearInterval(intervalId); // Cleanup function to clear interval on unmount
  }, [onTimerEnd, startTime]);

  // Convert seconds to minutes and seconds
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  // Border color based on remaining time
 
  let borderColor;
  if (minutes >= 2) {
    borderColor = "green";
  } else if (minutes >= 1 && minutes<=2) {
    borderColor = "orange";
  } else {
    borderColor = "red";
  }

  return (
    <Box
      sx={{
        width: "100%",
        border: `4px solid ${borderColor}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h3">
        <Stack spacing={1} direction={"row"}>
          <div>{minutes < 10 ? `0${minutes}` : minutes}</div>
          <div className="mb-3">
            <SemicolonIcon />
          </div>
          <div>{seconds < 10 ? `0${seconds}` : seconds}</div>
        </Stack>
      </Typography>
    </Box>
  );
};

export default CountdownTimer;
