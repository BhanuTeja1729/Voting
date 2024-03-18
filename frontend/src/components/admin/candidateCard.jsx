import React from 'react';
import { useState } from 'react';

import { Box, Container, Stack, Typography, Button, TextField } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const candidateCard = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [wardNo, setWardNo] = useState('')
    const [party, setParty] = useState('')


    function handleSubmit(event) {
        event.preventDefault();

    }
    return (
        <>
            <div className='shadow w-4/5'>
                <Accordion defaultExpanded >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                    >
                        Register Candidates
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="First Name"
                                onChange={e => setFirstName(e.target.value)}
                                value={firstName}
                                fullWidth
                                required
                            />
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="Last Name"
                                onChange={e => setLastName(e.target.value)}
                                value={lastName}
                                fullWidth
                                required
                            />
                        </Stack>
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Ward. No"
                            onChange={e => setWardNo(e.target.value)}
                            value={wardNo}
                            fullWidth
                            required
                            sx={{ mb: 4 }}
                        />
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Party Name"
                            onChange={e => setParty(e.target.value)}
                            value={party}
                            required
                            fullWidth
                            sx={{ mb: 3 }}
                        />
                        <Box sx={{ justifyContent: "space-between", display: 'flex' }}>
                            <Button
                                variant="contained"
                                component="label"
                            >
                                Upload File
                                <input
                                    type="file"
                                    hidden
                                />
                            </Button>
                            <Button variant='contained' color='success' sx={{ mr: 1.5 }}>Register</Button>
                        </Box>
                    </AccordionDetails>
                    {/* <AccordionActions>
                        <Button variant='contained' color='success' sx={{ mr: 1.5, mb: 1.5 }}>Register</Button>
                    </AccordionActions> */}
                </Accordion>
            </div>
        </>
    )
}

export default candidateCard