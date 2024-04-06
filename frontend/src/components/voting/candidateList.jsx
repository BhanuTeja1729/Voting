import React from "react";
import { Box, Stack } from "@mui/material";
import CountdownTimer from "./countdownTimer";

const candidateList = () => {
  const handleTimerEnd = () => {
    // alert("Timer Ended!");
  };
  return (
    <>
      <Box sx={{ maxWidth: "100%" }}>
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
            <CountdownTimer startTime={10} onTimerEnd={handleTimerEnd} />
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
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default candidateList;
