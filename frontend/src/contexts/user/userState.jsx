/* eslint-disable react/prop-types */
import { useState } from "react";
import UserContext from "./userContext";

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
  return (
    <UserContext.Provider
      value={{
        status,setStatusHandler
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
