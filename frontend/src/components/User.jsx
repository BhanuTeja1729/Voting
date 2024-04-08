import { Outlet, useLocation } from "react-router-dom";
import userImage from "/user.jpeg";
import Sidebar from "./user/userSidebar";
import { Box } from "@mui/material";

const User = () => {
  let location = useLocation();
  return (
    <>
      {location.pathname === "/user/guidelines" ? (
        <div>
          <div className="ml-0">
            <Sidebar />
          </div>
          <Box sx={{ ml: 40, mt: 10 }}>
            <Outlet />
          </Box>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="container w-full mt-20 flex flex-col md:flex-row bg-white shadow-md rounded-xl px-5 py-5 ">
            <div className="flex-1">
              <img
                src={userImage}
                alt="User"
                className="w-full h-auto rounded-xl md:rounded-l-xl"
              />
            </div>

            <div className="flex-1 p-8 flex justify-center items-center bg-gray">
              <Box sx={{}}>
                <Outlet />
              </Box>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
