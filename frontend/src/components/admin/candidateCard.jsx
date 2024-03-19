import React from 'react';
import { useState } from 'react';

import { Box, Card, Stack, Typography, Button, TextField, Divider, FormControl, MenuItem, Select, InputLabel } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import cImg from "/c1.png"

const candidateCard = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [wardNo, setWardNo] = useState('')
    const [party, setParty] = useState('')
    const [cImg, setCImg] = useState(null)

    const handleRegister = (e) => {
        e.preventDefault();
        console.log(firstName, lastName, wardNo, party, cImg)
    }


    let cName = "Pramod";
    let cWardNo = "B80";
    let cParty = "Pammi Sangha";

    const options = [
        { value: "Party 1", label: 'Party 1' },
        { value: "Party 2", label: 'Party 2' },
        { value: "Party 3", label: 'Party 3' }]


    return (
        <>
            <div className='shadow w-4/5'>
                <Accordion defaultExpanded >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                    >
                        <div className='text-xl font-semibold'>
                            Register Candidates
                        </div>
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
                        <Box sx={{ mb: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Party</InputLabel>
                                <Select
                                    value={party}
                                    label="Party"
                                    onChange={(e) => setParty(e.target.value)}
                                >
                                    {options.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ justifyContent: "space-between", display: 'flex' }}>
                            <Button
                                variant="contained"
                                component="label"
                            >
                                Upload File
                                <input
                                    type="file"
                                    hidden
                                    onChange={(e) => setCImg(e.target.files[0])}
                                />
                            </Button>
                            <Button variant='contained' color='success' sx={{ mr: 1.5 }} onClick={handleRegister}>Register</Button>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </div>
            <div className='my-5 text-3xl font-semibold'>
                <Typography variant=''>Registered Candidates</Typography>
            </div>

            <div className='shadow w-4/5 mt-4'>
                <Card sx={{ p: 3, mt: 5 }}>
                    <Stack spacing={3} direction="row" alignItems="center" justifyContent="space-between">
                        <Box sx={{ maxHeight: 60, maxWidth: 60, mb: 10 }}>
                            <img src={cImg} alt="Candidate Image" />
                        </Box>
                        <Divider orientation='vertical' flexItem />
                        <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                            Name: {firstName + " " + lastName}
                        </Typography>
                        <Divider orientation='vertical' flexItem />
                        <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                            Ward. No: {wardNo}
                        </Typography>
                        <Divider orientation='vertical' flexItem />
                        <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                            Party: {party}
                        </Typography>
                        <Divider orientation='vertical' flexItem />
                        <Button variant='outlined' color='error'>
                            <DeleteOutlineOutlinedIcon />
                        </Button>
                    </Stack>
                </Card>
            </div>


        </>
    )
}

export default candidateCard