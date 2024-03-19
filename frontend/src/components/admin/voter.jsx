import React from 'react'
import VoterCard from "./voterRegCard";

const voter = () => {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-semibold mt-20">
        Voter Page
        <VoterCard />
      </h1>
    </div>
  );
}

export default voter
