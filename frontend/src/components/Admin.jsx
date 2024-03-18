import React from 'react'
import {Outlet, useLocation} from 'react-router-dom';
import Sidebar from "./admin/adminSidebar";


const Admin = () => {

  let location = useLocation();
  return (
    <>
      {location.pathname  === "/admin/login" ? "" : <Sidebar />}
      <Outlet/>
    </>
  );
}

export default Admin