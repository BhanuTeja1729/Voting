import React from 'react'
import {Outlet, useLocation} from 'react-router-dom';
import Sidebar from "./admin/adminSidebar";
import { useNavigate } from "react-router-dom";
import adminImage from "/admin.jpeg"

const Admin = () => {

  let location = useLocation();
  console.log(location.pathname)
  return (
    <>
      { location.pathname  === "/admin/login" ? "" : <Sidebar /> }
      <Outlet />
    </>
  );
}

export default Admin