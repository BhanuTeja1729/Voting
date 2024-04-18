import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/user/userContext";
import { useActiveWalletConnectionStatus } from "thirdweb/react";

const userResults = () => {
  let userContext = useContext(UserContext);
  let navigate = useNavigate();

  const stat = useActiveWalletConnectionStatus();

  const { setStatusHandler } = userContext;
  useEffect(() => {
    if (stat == "disconnected") {
      setStatusHandler(stat);
      navigate("/");
    }
  }, [stat]);
  return <div>userResults</div>;
};

export default userResults;
