import React from 'react'
import {Outlet} from 'react-router-dom';
import adminImage from '/admin.jpeg'
import Sidebar from "./admin/adminSidebar";

const Admin = () => {
  return (
    <>
      <Sidebar/>
      < Outlet/>
    </>
  )
}

export default Admin