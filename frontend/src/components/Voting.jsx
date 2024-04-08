import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const Voting = () => {
  return (
    <>
      <Box sx={{ p:1,mx:2,mt: 10 }}>
        <Outlet />
      </Box>
    </>
  );
};

export default Voting;
