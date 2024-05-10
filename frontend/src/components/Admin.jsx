import React, { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./admin/adminSidebar";
import { Box } from "@mui/material";
import AdminContext from "../contexts/admin/adminContext";

const Admin = () => {
  const adminContext = useContext(AdminContext);
  const { admin, getAdminDetails } = adminContext;


  useEffect(() => {
    getAdminDetails();
  },[])


  return (
    <>
      <div>
        {admin ? (
          <div>
            <Sidebar />
            <Box sx={{ ml: 35 }}>
              <Outlet />
            </Box>
          </div>

        ) : (<Box sx={{ ml: 35 }}>
          <div>
            Please Login
          </div>
        </Box>


        )}
      </div>
    </>
  );
};

export default Admin;
