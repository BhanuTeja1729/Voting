import React from "react";
import { Link, useNavigate, } from "react-router-dom";
import { useDisconnect, useActiveAccount, useActiveWallet } from "thirdweb/react";
import { AALogin } from "../wallet/wallet";
import {
  Box,
  Drawer,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import GroupsIcon from "@mui/icons-material/Groups";
import BallotIcon from "@mui/icons-material/Ballot";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const drawerWidth = 240;

const adminSidebar = () => {

  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/admin/login");
    disconnect(wallet)
  }
  const icons = [
    DashboardIcon,
    HowToVoteIcon,
    GroupsIcon,
    BallotIcon,
    PublicOutlinedIcon,
  ];

  return (
    <>
      <Box sx={{ display: "flex" }}>
        {/* <CssBaseline /> */}

        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              {["Dashboard", "Voter", "Candidate", "Election", "Result"].map(
                (text, index) => (
                  <Link to={text.toLowerCase()}>
                    <ListItem key={text} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          {React.createElement(icons[index], {
                            fontSize: "large",
                          })}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                )
              )}
            </List>
            <Divider />
            <List sx={{ ml: 3 }}>
              <AALogin />
            </List>
            <List>
              <ListItem key={"Logout"} disablePadding>
                <ListItemButton onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutOutlinedIcon fontSize="large" />
                  </ListItemIcon>
                  <ListItemText primary={"Logout"} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default adminSidebar;
