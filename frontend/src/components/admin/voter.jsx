/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { Stack, Typography, Divider } from "@mui/material";
import VoterCard from "./voterRegCard";
const url = "http://localhost:5000/admin/voterlist";

const voter = () =>{
  useEffect(() => {
    getVoterList();
  }, []);
  const getVoterList = async () => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setVoters(data);
  };
  const [voters, setVoters] = useState([]);
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
      {voters.map((voter) => {
        return <VoterCard voter={voter} key={voter._id} />;
      })}
    </div>
  );
};

export default voter;
