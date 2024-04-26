import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
// eslint-disable-next-line no-unused-vars

//contracts
import elecContract from "../../contracts/election";
import { resolveMethod, readContract } from "thirdweb";


import UserContext from "../../contexts/user/userContext";
import { useActiveWalletConnectionStatus } from "thirdweb/react";

const userElections = () => {
  // eslint-disable-next-line no-unused-vars, react-hooks/rules-of-hooks
  const [election, setElection] = useState();
  const [activeElection, setActiveElection] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks

  let userContext = useContext(UserContext);
  let navigate = useNavigate();

  const stat = useActiveWalletConnectionStatus();
  const {
    setStatusHandler,
    user,
    setElectionChoice,
    getCandidateDetails,
    candidateList,
  } = userContext;

  const getElectionList = async () => {
    try {
      const data = await readContract({
        contract: elecContract,
        method: resolveMethod("getElectionDetails"),
        params: []
      })

      if (data) {
        setElection(data);
      }
    } catch (error) {
      console.log(error)
    }


  }
  var elections=[];
  useEffect(() => {
    if (election !== undefined) {
      for (let i = 0; i < election[0].length; i++) {
        if (election[2][i] === true) {
          let obj = {
            id: election[0][i],
            name: election[1][i],
            status: election[2][i]
          };
          elections.push(obj);
        }
      }
      setActiveElection(elections);
      console.log(activeElection);
    }

  }, [election]);

  console.log(activeElection)
  console.log(user)


  const handleVote = async (elec) => {
    await setElectionChoice(elec.id);
    let cand= await getCandidateDetails();
    console.log(candidateList);
    if(cand){
    navigate("/voting/candidates");
    }
  };

  useEffect(() => {
    getElectionList();
  }, []);

  useEffect(() => {

    if (stat == "disconnected") {
      setStatusHandler(stat);
      navigate("/");
    }
  }, [stat]);



  return (
    <>
      <div className="my-6 font-semibold text-3xl">Elections</div>
      {/* {election && user.hasVoted == false ? ( */}
        <div>
          <Box
            sx={{
              boxShadow: 3,
              maxWidth: "100%",
              marginRight: 17,
              padding: 4,
              my: 3,
              display: "flex",
              justifyContent: "space-around",
              backgroundImage:
                "url('https://static.vecteezy.com/system/resources/previews/029/593/602/non_2x/abstract-background-with-a-gradient-of-a-colorful-background-vector.jpg')",
              backgroundRepeat: "no-repeat",
            }}
          >
            {activeElection.map((elec) => (
              
              <Box key={elec.id}
                sx={{
                  boxShadow: 3,
                  width: "25%",
                  height: 500,
                  padding: 3,
                  my: 3,
                  backgroundColor: "rgba(255, 255, 255, 0.4)",
                  borderRadius: 4,
                }}
              >
                <div className=" text-center text-3xl font-semibold mt-4">
                  {elec.name}
                </div>
                <img
                  src="https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067_640.png"
                  alt="img"
                  width={"100%"}
                  height={"25%"}
                  className="my-4"
                />
                <div className="text-xl font-medium p-5">
                  <div>Id : {elec.id}</div>
                  {/* <div>Date</div>
                <div>Time</div> */}
                </div>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ width: "75%", mx: 4 }}
                  onClick={() => handleVote(elec)}
                >
                  <div className="text-white-600 text-lg ">Vote</div>
                </Button>
              </Box>
            ))}
          </Box>
        </div>
      ) : (
        <Box
          sx={{
            boxShadow: 3,
            maxWidth: "100%",
            padding: 4,
            my: 3,
          }}
        >
          {user.hasVoted ? (
            <h1>You have already casted your vote,await for results</h1>
          ) : (
            <h1>No Elections Currently</h1>
          )}
        </Box>
      {/* )} */}
    </>
  );
};

export default userElections;
