/* eslint-disable react/prop-types */
import { useState } from "react";
import AdminContext from "./adminContext";

//contracts
import voterContract from "../../contracts/voter";
import { prepareContractCall, resolveMethod, sendTransaction } from "thirdweb";

const AdminState = (props) => {
  const host = "http://localhost:5000/admin";
  const [voterList, setVoterList] = useState([]);
  const [candidateList, setCandidateList] = useState([]);

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

  const getCandidateList = async () => {
    // console.log("test");
    try {
      const res = await fetch(`${host}/candidatelist`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setCandidateList(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleApprove = async (props) => {
    const { _aadharno, _email, _imgUrl, _name, _id, voter, account } = props;
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
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
