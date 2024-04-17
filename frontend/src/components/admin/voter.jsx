/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect,useContext } from "react";
import { Stack, Typography, Divider } from "@mui/material";
import VoterCard from "./voterRegCard";
import AdminContext from "../../contexts/admin/adminContext";


const voter = () =>{
  const adminContext = useContext(AdminContext);
  const { voterList, getVoterList, deleteVoter } = adminContext;
  const voters = voterList;
  useEffect(() => {
    getVoterList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const handleDeleteVoter = async (voterId) => {
    try {
      // Call the deleteVoter function from context with the voterId
      await deleteVoter(voterId);
    } catch (error) {
      console.error("Error deleting voter:", error);
      // Handle error: You might want to display an error message to the user
    }
  };

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
        return <VoterCard voter={voter} key={voter._id} onDelete={handleDeleteVoter}/>;
      })}
    </div>
  );
};

export default voter;
