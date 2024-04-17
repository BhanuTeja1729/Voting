/* eslint-disable react/prop-types */
import  { useState } from 'react';
import  AdminContext  from './adminContext';
const AdminState = (props) => {
  const host="http://localhost:5000/admin";
  const [voterList, setVoterList] = useState([]);
 
  const getVoterList = async () => {
    console.log("test")
    try {
      const res = await fetch(`${host}/voterlist`,{
        method:'GET',
        headers:{
          Accept:'application/json',
          'Content-Type': "application/json"
        }
      });
      const data = await res.json();
      console.log(data);
      setVoterList(data);
    } catch (error) {
      console.error(error.message);
    }
  }

  return(
    <AdminContext.Provider value={{
      voterList,
      getVoterList
    }}>
      {props.children}
    </AdminContext.Provider>
  )
}

export default AdminState;
