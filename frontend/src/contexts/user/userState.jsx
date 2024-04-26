/* eslint-disable react/prop-types */
import { useState } from "react";
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
} from "thirdweb";
import { useActiveAccount } from "thirdweb/react";

const UserState = (props) => {
  const [status, setStatus] = useState(false);
  const [electionChoice, setElectionChoice] = useState("");
  const [candidateList, setCandidateList] = useState([]);
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
      console.log(data);
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
      console.log(error);
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
      console.log(error);
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
          candidates.push(obj);
        }
        console.log(candidates);
        setCandidateList(candidates);
        return true;
      }
    } catch (error) {
      console.log(error);
      console.log("Failed to get candidate details");
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
        console.log("Vote updated for candidate " + transactionHash);
        return true;
      }
    } catch (error) {
      console.log("Failed to update vote count");
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
        console.log("Voter status updated " + transactionHash);
        user.hasVoted = true;
        return true;
      }
    } catch (error) {
      console.log("Failed to update voter status");
      console.log(error);
    }
  };

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
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
