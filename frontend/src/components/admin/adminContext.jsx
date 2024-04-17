import { createContext } from "react";
import { useState } from "react";

const adminContext = createContext();

const AdminContext = (props) => {
  const host = "http://localhost:5000/admin";
  const voterInitially = [];
  const [voters, setVoters] = useState(voterInitially);

  // Get voter list
  const getVoterList = async () => {
    try {
      const response = await fetch(`${host}/voterlist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch voter list");
      }

      const data = await response.json();
      setVoters(data);
    } catch (error) {
      console.error("Error fetching voter list:", error);
      // Handle error: You might want to set an error state or display a message to the user.
    }
  };

  return (
    <adminContext.Provider value={{ voters, getVoterList }}>
      {props.children}
    </adminContext.Provider>
  );
};
export default AdminContext;
