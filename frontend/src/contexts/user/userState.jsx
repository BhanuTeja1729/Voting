/* eslint-disable react/prop-types */
import { useState } from "react";
import UserContext from "./userContext";
import axios from "axios";

//contracts
import voterContract from "../../contracts/voter";
import { readContract, resolveMethod } from "thirdweb";


const UserState = (props) => {
  const [status, setStatus] = useState(false);
  const [user, setUser] = useState({
    voterId: "",
    name: "",
    aadhar: "",
    email: "",
    imgUrl: "",
    hasVoted:false,
  });
  const [faceRecognized, setFaceRecognized] = useState(false);
  const [message, setMessage] = useState("");

  const returnVoter = async (_voterId) => {

    try {
      const data = await readContract({
        contract: voterContract,
        method: resolveMethod("returnVoter"),
        params: [_voterId]
      })
      console.log(data)
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
      console.log(error)
    }
  }

  const setStatusHandler = (stat) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    if (stat === 'connected') {
      setStatus(true);

    }
    else {
      setStatus(false);
    }
  }

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
  }

  return (
    <UserContext.Provider
      value={{
        status, setStatusHandler, uploadFile, returnVoter, user, faceRecognized, setFaceRecognized, message, setMessage,setUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
