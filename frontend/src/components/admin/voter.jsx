/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect,useContext } from "react";
import { Stack, Typography, Divider } from "@mui/material";
import VoterCard from "./voterRegCard";
import AdminContext from "./adminContext";


const voter = () =>{
  const context=useContext(AdminContext);
  console.log(AdminContext);
  console.log(context);
  const {getVoterList,voters}=context;
  useEffect(() => {
    getVoterList();
  }, []);
  return (
    <div>
      <h1 className="mb-8 text-3xl font-semibold mt-20">Voter Page</h1>
      <Stack direction={"row"} justifyContent={"space-around"} mt={5}>
        <Typography
          sx={{ textAlign: "center", fontSize: 30, fontWeight: "semibold" }}
        >
          User Entered Data
        </Typography>
        <Typography
          sx={{ textAlign: "center", fontSize: 30, fontWeight: "semibold" }}
        >
          API Fetched Data
        </Typography>
        <Divider flexItem />
      </Stack>     
      {Array.isArray(voters)&& voters.map((voter) => {
        return <VoterCard voter={voter} key={voter._id} />;
      })}
    </div>
  );
};

export default voter;
