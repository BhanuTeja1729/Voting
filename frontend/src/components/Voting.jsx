import React from 'react'
import { Outlet } from 'react-router-dom'

const Voting = () => {
  return (
    <>
    <div className='mt-12'> Voting Interface</div>
    <Outlet />
    </>
  )
}

export default Voting