/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import AdminContext from "./adminContext";
import axios from "axios";

//contracts
import voterContract from "../../contracts/voter";
import candContract from "../../contracts/candidate";
import elecContract from "../../contracts/election";
import { prepareContractCall, resolveMethod, sendTransaction, readContract } from "thirdweb";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { hexToBigInt } from "thirdweb/utils";


import { create } from "../../api/admin";
import { toast } from "react-toastify";

const AdminState = (props) => {
  const account = useActiveAccount();
  const host = "http://localhost:5000/admin";
  const [voterList, setVoterList] = useState([]);
  const [candidateList, setCandidateList] = useState([]);
  const [electionList, setElectionList] = useState([]);
  const [wardNos, setWardNos] = useState([]);
  const [admin, setAdmin] = useState(null);
  const [resultByE, setResultByE] = useState();
  const [resultByW, setResultByW] = useState();

  const [publishResult, setPublishResult] = useState(false);

  const getVoterList = async () => {
    // console.log("test");
    try {
      const res = await fetch(`${host}/voterlist`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // console.log(data);
      setVoterList(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteVoter = async (id) => {
    try {
      const response = await fetch(`${host}/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete voter");
      }

      setVoterList((prevVoters) =>
        prevVoters.filter((voter) => voter._id !== id)
      );
    } catch (error) {
      console.error("Error deleting voter:", error);
    }
  };

  const approveVoter = async (id) => {
    try {
      const response = await fetch(`${host}/approve/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to Approve voter");
      }
    } catch (error) {
      console.error("Error Approving voter:", error);
    }
  };



  const handleApprove = async (props) => {
    const { _aadharno, _email, _imgUrl, _name, _id, voter } = props;
    try {
      const transaction = await prepareContractCall({
        contract: voterContract,
        method: resolveMethod("addVoter"),
        params: [_id, _name, _aadharno, _email, _imgUrl],
      });
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });
      if (transactionHash) {
        const approved = await approveVoter(voter._id);
        console.log({
          message: "Voter Approved Successfully",
          hash: transactionHash,
          approved,
        });
        return true;
      }
    } catch (error) {
      console.log("Voter Not Approved In Frontend");
      console.log(error);
    }
  };

  const uploadFile = async (
    type,
    candidateFirstName,
    candidateLastName,
    img
  ) => {
    const data = new FormData();
    data.append("file", type === "image" ? img : null);
    data.append("upload_preset", "image_preset");

    // Rename the file
    const fileName = `${candidateFirstName}_${candidateLastName}`;
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

  const addCandidate = async (props) => {
    const { _name, _election_id, _ward_no, _imgUrl, _party } = await props;
    try {
      const transaction = await prepareContractCall({
        contract: candContract,
        method: resolveMethod("addCandidate"),
        params: [_name, _election_id, _ward_no, _imgUrl, _party],
      });
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });
      console.log(transactionHash);
      if (transactionHash) {
        toast.success("Candidate Added to Blockchain");
        return true;
      }
    } catch (error) {
      toast.error("Candidate Failed to Register on Blockchain");
      console.error(error);
    }
  };

  const addElection = async (props) => {
    const { _election_id, _election_name } = await props;
    try {
      const transaction = await prepareContractCall({
        contract: elecContract,
        method: resolveMethod("addElection"),
        params: [_election_name, _election_id,],
      });
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });
      console.log(transactionHash);
      if (transactionHash) {
        console.log("Election Added to Blockchain");
        return true;
      }
    } catch (error) {
      console.log("Election Failed to Register on Blockchain");
      console.error(error);
    }
  }

  const switchElectionStatus = async (props) => {
    const { _id } = props;
    console.log(_id)
    try {
      const transaction = await prepareContractCall({
        contract: elecContract,
        method: resolveMethod("switchElectionStatus"),
        params: [_id]
      });
      const { transactionHash } = await sendTransaction({
        transaction,
        account
      })
      console.log(transactionHash);
      if (transactionHash) {
        console.log("Election Status Updated on Blockchain");
        return true;
      }
    } catch (error) {
      console.log("Failed to Updaate Election Status on Blockchain");
      console.error(error);
    }
  }

  const getAdminDetails = async (props) => {
    try {
      const res = await fetch(`${host}/curr`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data) {
        console.log(data);
        setAdmin(data);
        console.log("Login Successful");
      } else {
        console.log("Please Login");
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  const getCandidateDetailsByElectionId = async (props) => {
    const { _electionId } = props
    const data = await readContract({
      contract: candContract,
      method: resolveMethod("getCandidatesByElectionId"),
      params: [_electionId]
    })
    if (data) {
      await console.log(data);
      return data;
    } else {
      console.log("No Candidates Found");
    }
  }
  const getVoteCountsByEid = async (_electionId) => {

    let results = [];

    const data = await readContract({
      contract: candContract,
      method: resolveMethod("getCandidatesByElectionId"),
      params: [_electionId]
    })
    if (data) {
      console.log(data)
      for (let i = 0; i < data[0].length; i++) {
        let obj = {
          names: data[0][i],
          ward: data[1][i],
          party: data[2][i],
          imageUrl: data[3][i],
          votes: Number(hexToBigInt(data[4][i])),
        };
        await results.push(obj);
      }
      await setResultByE(results);
      await console.log(results);
    } else {
      console.log("No Votes Found");
    }
  }

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
      await setResultByW(results);
      await console.log(results);
    } else {
      console.log("No Votes Found");
    }
  }

  const getCandidateList = async (_electionId) => {
    try {
      const data = await readContract({
        contract: candContract,
        method: resolveMethod("getCandidatesByElectionId"),
        params: [_electionId]
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
      setCandidateList(candidates);
      updateWardNos()
    } catch (error) {
      console.error(error)
    }
  };

  const updateWardNos = async () => {
    let wards = [];
    // Ensure candidateList is not empty before proceeding
    if (candidateList.length > 0) {
      for (let i = 0; i < candidateList.length; i++) {
        if (!wards.includes(candidateList[i].wardNo)) {
          wards.push(candidateList[i].wardNo);
        }
      }
      setWardNos(wards);

    }
  };

  const activateResults = async () => {
    console.log(publishResult)
    setPublishResult(true);
  }

  const deactivateResults = async () => {
    console.log(publishResult)
    setPublishResult(false);
  }




  return (
    <AdminContext.Provider
      value={{
        voterList,
        getVoterList,
        deleteVoter,
        approveVoter,
        candidateList,
        getCandidateList,
        handleApprove,
        addCandidate,
        uploadFile,
        addElection,
        switchElectionStatus,
        setElectionList,
        electionList,
        admin,
        getAdminDetails,
        getCandidateDetailsByElectionId,
        getVoteCountsByEid,
        getVoteCountsByWard,
        resultByE,
        resultByW,
        wardNos,
        activateResults,
        publishResult,
        deactivateResults

      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
}



export default AdminState;
