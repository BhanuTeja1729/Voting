/* eslint-disable react/prop-types */
import { useState } from "react";
import UserContext from "./userContext";
import axios from "axios";

const UserState = (props) => {
  const [status, setStatus] = useState(false);

  
  const setStatusHandler = (stat) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  if(stat==='connected'){
    setStatus(true);
    
  }
  else{
    setStatus(false);
  }
}

const uploadFile = async (type, fName, lName, img) => {
  const data = new FormData();
    data.append("file", type === "image" ? img : null);
    data.append("upload_preset", "image_preset");

    // Rename the file
    const fileName = `${fName}_${lName}`;
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
        status,setStatusHandler,uploadFile
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
