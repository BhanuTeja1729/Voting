import React, { useEffect, useContext } from "react";
import { Button, Box, List, ListItem, Divider } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/user/userContext";
import { useActiveWalletConnectionStatus } from "thirdweb/react";

const userGuidelines = () => {

  let userContext = useContext(UserContext);
  let navigate = useNavigate();

  const stat = useActiveWalletConnectionStatus();

  const { setStatusHandler } = userContext;

  useEffect(() => {
    if (stat == "disconnected") {
      setStatusHandler(stat)
      navigate("/");
    }
  }, [stat]);

  return (
    <>
      <div className="my-6 font-semibold text-3xl">Welcome Voter</div>

      <Box
        sx={{
          boxShadow: 3,
          maxWidth: "100%",
          marginRight: 17,
          padding: 4,
          my: 3,
        }}
      >
        <div className="font-medium text-3xl -mt-4 ">Guidelines</div>
        <Box sx={{ padding: 2 }}>
          <List sx={{ listStyle: "decimal" }}>
            <ListItem sx={{ display: "list-item" }}>
              Make sure you have entered valid Aadhar & Voter ID Details while
              Registration, If there are any Discrepencies with your Identity
              you may not be Eligible to Vote.
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              User verification is done through Face Recognition, Make sure to
              follow proper guidelines mentioned at that time.
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              Entire session should be done in one sitting, Refreshing or going
              back will make your session invalid.
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              In Case you are Unable to Vote, Please go to your Respective ward
              and Vote.
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              <div>
                For any enquiries, Email us at{" "}
                <span className="text-blue-600"> voterhelpline@gmail.com</span>
              </div>
            </ListItem>
          </List>
        </Box>
      </Box>
    </>
  );
};

export default userGuidelines;
