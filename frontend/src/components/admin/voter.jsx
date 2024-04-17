/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect,useContext } from "react";
import { Stack, Typography, Divider } from "@mui/material";
import VoterCard from "./voterRegCard";
import AdminContext from "../../contexts/admin/adminContext";


const voter = () =>{
  const adminContext = useContext(AdminContext);
  const { voters, getVoterList } = adminContext;
  useEffect(() => {
    getVoterList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {console.log(voters)}
      {Array.isArray(voters)&& voters.map((voter) => {
        return <VoterCard voter={voter} key={voter._id} />;
      })}
    </div>
  );
};

export default voter;
