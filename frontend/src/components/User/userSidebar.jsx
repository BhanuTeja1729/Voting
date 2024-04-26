import React,{useContext} from "react";
import { Link, useLocation } from "react-router-dom";
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

import ListAltIcon from "@mui/icons-material/ListAlt";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import UserContext from "../../contexts/user/userContext";

const drawerWidth = 240;

const userSidebar = () => {
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();
  const icons = [ListAltIcon, HowToVoteIcon, PublicOutlinedIcon];

   let userContext = useContext(UserContext);
  const { setUser } = userContext;

  const handleLogout = () => {
    setUser({
      voterId: "",
      name: "",
      aadhar: "",
      email: "",
      imgUrl: "",
      hasVoted: false,
    });
    disconnect(wallet)
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
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
              {["Guidelines", "Elections", "Results"].map((text, index) => (
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
              ))}
            </List>
            <Divider />
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
            <List sx={{ ml: 3 }}>
              <AALogin />
            </List>
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default userSidebar;
