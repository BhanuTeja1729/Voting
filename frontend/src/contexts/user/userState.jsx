/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import UserContext from "./userContext";
import axios from "axios";


//contracts
import voterContract from "../../contracts/voter";
import candContract from "../../contracts/candidate";
import {
  readContract,
  resolveMethod,
  sendTransaction,
  prepareContractCall,
  hexToBigInt
} from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { toast } from "react-toastify";

const UserState = (props) => {
  const [status, setStatus] = useState(false);
  const [electionChoice, setElectionChoice] = useState("");
  const [_electionId, setElectionId] = useState("101");
  const [candidateList, setCandidateList] = useState([]);
  const [candList,setCandList]=useState("");
  const [wardNos,setWardNos]=useState();
  const [resultsByWard,setResultsByWard]=useState([]);
  const [resStatus, setResStatus] = useState(false);
  const account = useActiveAccount();
  const [user, setUser] = useState({
    voterId: "",
    name: "",
    aadhar: "",
    email: "",
    imgUrl: "",
    hasVoted: false,
  });
  const [faceRecognized, setFaceRecognized] = useState(false);
  const [message, setMessage] = useState("");

  const returnVoter = async (_voterId) => {
    try {
      const data = await readContract({
        contract: voterContract,
        method: resolveMethod("returnVoter"),
        params: [_voterId],
      });
      // console.log(data);
      if (data) {
        setUser({
          voterId: data.voterId,
          name: data.name,
          aadhar: data.aadharNo,
          email: data.email,
          imgUrl: data.imgUrl,
          hasVoted: data.castedVote,
        });

      }
    } catch (error) {
      toast.log(error);
    }
  };

  const setStatusHandler = (stat) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    if (stat === "connected") {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };

  const uploadFile = async (type, fName, lName, img) => {
    const data = new FormData();
    data.append("file", type === "image" ? img : null);
    data.append("upload_preset", "image_preset");

    // Rename the file
    const fileName = `${fName}${lName}`;
    data.append("public_id", fileName);

    try {
      const resourceType = "image";
      const cloudName = "dcpajsgwj";
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      return secure_url;
    } catch (error) {
      toast.error(error);
    }
  };

  const getCandidateDetails = async () => {
    try {
      const data = await readContract({
        contract: candContract,
        method: resolveMethod("getCandidatesByElectionId"),
        params: [electionChoice],
      });
      let candidates = [];
      if (data) {
        console.log(data);
        for (let i = 0; i < data[0].length; i++) {
          let obj = {
            name: data[0][i],
            wardNo: data[1][i],
            partyNo: data[2][i],
            imageUrl: data[3][i],
          };
         await candidates.push(obj);
        }
         console.log(candidates);
         setCandidateList(candidates);
        return true;
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to get candidate details");
    }
  };


  const updateVoter = async (props) => {
    const { candidate } = props;
     var name= candidate.name;
    try {
      const transaction = await prepareContractCall({
        contract: candContract,
        method: resolveMethod("updateVoteCount"),
        params: [name],
      });
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });
      if (transactionHash) {
        toast.success("Vote Updated for Candidate " +"Transaction Hash"+ transactionHash);
        return true;
      }
    } catch (error) {
      toast.error("Failed to update vote count");
      console.log(error);
    }
  };

  const updateVoterStatus = async () => {
    try {
      const transaction = await prepareContractCall({
        contract: voterContract,
        method: resolveMethod("vote"),
        params: [user.voterId],
      });
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });
      if (transactionHash) {
        toast.success("Vote Casted , Transaction Hash: " + transactionHash);
        user.hasVoted = true;
        return true;
      }
    } catch (error) {
      toast.error("Failed to Cast Vote");
      console.log(error);
    }
  };

  const getCandidateList = async () => {
    try {
      const data = await readContract({
        contract: candContract,
        method: resolveMethod("getCandidatesByElectionId"),
        params: ["101"]
      })

      let candidates = [];
      if (data) {
        console.log(data);
        for (let i = 0; i < data[0].length; i++) {
          let obj = {
            name: data[0][i],
            wardNo: data[1][i],
            partyNo: data[2][i],
            imageUrl: data[3][i],
          };
          await candidates.push(obj);
        }
      }

      console.log(candidates);
      setCandList(candidates);
      updateWardNos()
    } catch (error) {
      console.error(error)
    }
  };

  const updateWardNos = async () => {
    let wards=[]
    for(let i=0;i<candList.length;i++){
      if(!wards.includes(candList[i].wardNo)){
        wards.push(candList[i].wardNo);
      }
    }
    await setWardNos(wards);
    console.log(wardNos);
  };
  
  const getVoteCountsByWard = async (_wardNo) => {

    let results = [];

    const data = await readContract({
      contract: candContract,
      method: resolveMethod("getCandidatesByWardNo"),
      params: [_wardNo]
    })
    if (data) {
      console.log(data)
      for (let i = 0; i < data[0].length; i++) {
        let obj = {
          names: data[0][i],
          imageUrl: data[1][i],
          votes: Number(hexToBigInt(data[2][i])),
        };
        await results.push(obj);
      }
      await setResultsByWard(results);
      await console.log(results);
    } else {
      console.log("No Votes Found");
    }
  }


  return (
    <UserContext.Provider
      value={{
        status,
        setStatusHandler,
        uploadFile,
        returnVoter,
        user,
        faceRecognized,
        setFaceRecognized,
        message,
        setMessage,
        setUser,
        electionChoice,
        setElectionChoice,
        getCandidateDetails,
        candidateList,
        updateVoter,
        updateVoterStatus,
        resultsByWard,
        getCandidateList,
        wardNos,
        getVoteCountsByWard,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
