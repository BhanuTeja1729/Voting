import React from 'react'
import { Divider } from '@mui/material';
const voterRegCard = () => {
  return (
    <div className="my-9 px-6 py-6 drop-shadow-lg bg-slate-100 rounded-2xl  w-1/2 flex flex-row ">
      <div className="flex justify-between basis-1/2 mx-2">
        <div className='flex justify-between flex-col'>
          <h1 className="text-2xl flex">Name:<h1 className='text-xl text-slate-500'>Shashank k Prabhu</h1></h1>
          <h1 className="text-2xl flex">Age:<h1 className='text-xl text-slate-500'>21</h1></h1>
          
        </div>
      </div>
      <Divider
        className="bg-black"
        orientation="vertical"
        variant="fullWidth"
        flexItem
      />
      <div className="flex justify-between basis-1/2 mx-2">Bye</div>
    </div>
  );
}

export default voterRegCard;
