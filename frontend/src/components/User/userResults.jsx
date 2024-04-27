import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/user/userContext";
import { useActiveWalletConnectionStatus } from "thirdweb/react";
import { Button } from "@mui/material";

const userResults = () => {
  let userContext = useContext(UserContext);
  let navigate = useNavigate();

  const stat = useActiveWalletConnectionStatus();

  useEffect(() => {
    getResults();

  }, []);

  const handleResults = async () => {
    console.log(resultsByWard);
    getResults();
    console.log("clicked")
  }

  const { setStatusHandler, getResults, resultsByWard } = userContext;
  useEffect(() => {
    if (stat == "disconnected") {
      setStatusHandler(stat);
      navigate("/");
    }
  }, [stat]);
  return <div>
    <Button onClick={handleResults}>Get Vote Count</Button>
  </div>;
};

export default userResults;
