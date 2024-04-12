import { Outlet, useLocation } from "react-router-dom";
import userImage from "/user.jpeg";
import Sidebar from "./user/userSidebar";
import { Box, Stack } from "@mui/material";

const User = () => {
  let location = useLocation();
  // let guidelines = "/user/guidelines";
  // let elections = "/user/elections";
  // let results = "/user/results";
  let login = "/user/login";
  let signup = "/user/signup";
  return (
    <>
      {location.pathname === login || location.pathname === signup ? (

        <div className="flex justify-center items-center h-auto ">
          <div className="container w-full mt-20 mb-5 flex flex-col md:flex-row bg-white shadow-md rounded-xl px-5 py-5 ">
            <div className="flex-1">
              <img
                src={userImage}
                alt="User"
                className="w-full h-auto rounded-xl md:rounded-l-xl"
              />
            </div>

            <div className="flex-1 p-8 flex justify-center items-center bg-gray">
              <Box>
                <Outlet />
              </Box>
            </div>
          </div>
        </div>


      ) : (
        <div>
          <div className="ml-0">
            <Sidebar />
          </div>
          <Box sx={{ ml: 40, mt: 10 }}>
            <Outlet />
          </Box>
        </div>
      )}
    </>
  );
};

export default User;
