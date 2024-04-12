import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./admin/adminSidebar";

import { Box } from "@mui/material";

const Admin = () => {
  let location = useLocation();
  return (
    <>
      <div>
        <div className="container ml-0">
          {location.pathname === "/admin/login" ? (
            <Box sx={{ml:35, mt:5}}>
              <Outlet />
            </Box>
          ) : (
            <div>
              <Sidebar />
              <Box sx={{ ml: 35 }}>
                <Outlet />
              </Box>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;
