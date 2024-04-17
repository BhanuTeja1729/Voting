/* eslint-disable react/prop-types */
import { useState } from "react";
import AdminContext from "./adminContext";
const AdminState = (props) => {
  const host = "http://localhost:5000/admin";
  const [voterList, setVoterList] = useState([]);

  const getVoterList = async () => {
    console.log("test");
    try {
      const res = await fetch(`${host}/voterlist`, {
        method: "GET",
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
      // Get the JWT token from the cookie
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("jwt="))
        .split("=")[1];

        console.log(token)

      if (!token) {
        throw new Error("JWT token not found in cookie");
      }

      const response = await fetch(`${host}/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
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

  return (
    <AdminContext.Provider
      value={{
        voterList,
        getVoterList,
        deleteVoter,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
