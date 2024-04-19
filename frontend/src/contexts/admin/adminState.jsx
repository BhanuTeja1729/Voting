/* eslint-disable react/prop-types */
import { useState } from "react";
import AdminContext from "./adminContext";
const AdminState = (props) => {
  const host = "http://localhost:5000/admin";
  const [voterList, setVoterList] = useState([]);
  const [candidateList, setCandidateList] = useState([]);

  const getVoterList = async () => {
    console.log("test");
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
      console.log(data);
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

      c
    } catch (error) {
      console.error("Error Approving voter:", error);
    }
  };

  const getCandidateList = async () => {
    console.log("test");
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

  return (
    <AdminContext.Provider
      value={{
        voterList,
        getVoterList,
        deleteVoter,
        approveVoter,
        candidateList,
        getCandidateList
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
