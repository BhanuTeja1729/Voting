import { React, useState, useContext, useEffect } from 'react'

import { Accordion, AccordionSummary, AccordionDetails, Stack, TextField, Box, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useActiveAccount, useReadContract } from 'thirdweb/react';
import { resolveMethod } from 'thirdweb';
import AdminContext from '../../contexts/admin/adminContext';
import elecContract from '../../contracts/election';


const election = () => {

  const account = useActiveAccount();
  const adminContext = useContext(AdminContext);
  const { addElection, setElectionList, electionList} = adminContext;
  // const elections = electionList
  const [electionName, setElectionName] = useState('')
  const [election_id, setElectionId] = useState('')


  const {data,isLoading} = useReadContract({
    contract: elecContract,
    method: resolveMethod("getElectionDetails"),
    params: []
  })
  if(!isLoading){
    setElectionList(data)
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    let _election_id = election_id;
    let _election_name = electionName;
    const props = { _election_id, _election_name }
    const added = await addElection(props)
    if (added) {
      console.log('Election Created Successfully')
      console.log(electionList)
    }

  }


  return (
    <>
      <h1 className="mb-8 text-3xl font-semibold mt-20">
        Election
      </h1>
      <div className='shadow w-4/5'>
        {account && (
          <Accordion defaultExpanded >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <div className='text-xl font-semibold'>
                Create Election
              </div>
            </AccordionSummary>
            <AccordionDetails>

              <TextField
                type="text"
                variant='outlined'
                color='primary'
                label="Election Name"
                onChange={e => setElectionName(e.target.value)}
                value={electionName}
                sx={{ mb: 4 }}
                fullWidth
                required
              />

              <TextField
                type="text"
                variant='outlined'
                color='primary'
                label="Election Id"
                onChange={e => setElectionId(e.target.value)}
                value={election_id}
                sx={{ mb: 4 }}
                fullWidth
                required
              />

              <Box sx={{ justifyContent: "space-between", display: 'flex' }}>

                <Button variant='contained' color='success' sx={{ mr: 1.5 }} onClick={handleCreate} disabled={electionName == '' || election_id == ""}>Create Election</Button>
              </Box>
            </AccordionDetails>
            {/* <AccordionActions>
                       <Button variant='contained' color='success' sx={{ mr: 1.5, mb: 1.5 }}>Register</Button>
                   </AccordionActions> */}
          </Accordion>
        )

        }
      </div>

    </>
  );
}

export default election