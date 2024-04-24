/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useContext } from "react";
import { Stack, Typography, Divider } from "@mui/material";
import VoterCard from "./voterRegCard";
import AdminContext from "../../contexts/admin/adminContext";
import voterContract from "../../contracts/voter";
import { resolveMethod, hexToNumber } from "thirdweb";
import { useReadContract } from "thirdweb/react";
const voter = () => {
 
  const adminContext = useContext(AdminContext);
  const { voterList, getVoterList} = adminContext;
  const voters = voterList;
  useEffect(() => {
    getVoterList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { data, isLoading } = useReadContract({
    contract: voterContract,
    method: resolveMethod("totalVoters"),
    params: [],
  });
  if (!isLoading) {
    console.log(hexToNumber(data));
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-semibold mt-20">Voter Page</h1>
      <h2 className="text-xl font-semibold">Total Registered Voters: {!isLoading && hexToNumber(data)}</h2>
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
      {/* {console.log(voters)} */}
      {Array.isArray(voters) &&
        voters.map((voter) => {
          return <VoterCard voter={voter} key={voter._id} />;
        })}
    </div>
  );
};

export default voter;
