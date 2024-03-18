import React from 'react'
import { Box } from '@mui/material';

import CandidateCard from "./candidateCard";

const candidate = () => {
  return (
    <>
      <Box sx={{mx:5, my:12 }}>
      <h1 className="mb-8 text-3xl font-semibold">
        Candidate
      </h1>

      <CandidateCard />
      </Box>
    </>
  )
}

export default candidate