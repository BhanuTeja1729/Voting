import React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import logo from "/Election.svg";

function Header() {
  return (
    <AppBar
      fixed
      color="default"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="xl">
        <Toolbar className="flex items-center">
          <Container class="flex-none">
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              className="hidden md:flex mr-2 "
            >
              <img src={logo} alt="" className="h-16" />
            </Typography>
          </Container>
          <Container>
            <Typography
              variant="h5"
              noWrap
              class="font-bold text-3xl text-black text-center "
            >
              BLOCK BALLOT
            </Typography>
          </Container>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
