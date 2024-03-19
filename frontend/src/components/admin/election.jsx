import { React, useState } from 'react'

import { Accordion, AccordionSummary, AccordionDetails, Stack, TextField, Box, Button } from '@mui/material';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import 'dayjs/locale/en-gb';
import dayjs from "dayjs";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const election = () => {

  const [electionName, setElectionName] = useState('')
  const [startTime, setStartTime] = useState(null)
  const [stopTime, setStopTime] = useState(null)
  const [region, setRegion] = useState('')

  const handleCreate = (e) => {
    e.preventDefault();

    console.log(electionName, startTime, stopTime, region);
  }


  return (
    <>
      <h1 className="mb-8 text-3xl font-semibold mt-20">
        Election
      </h1>
      <div className='shadow w-4/5'>
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
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <LocalizationProvider color="primary" dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                <DateTimePicker sx={{ mb: 4, width: "100%" }}
                  label="Start Time" value={startTime} disablePast onChange={(e) => {
                    setStartTime(dayjs(e).format("DD-MM-YYYY HH:mm"));
                  }} />
                <DateTimePicker sx={{ mb: 4, width: "100%" }}
                  label="Stop Time" value={stopTime} disablePast onChange={(e) => {
                    setStopTime(dayjs(e).format("DD-MM-YYYY HH:mm"));
                  }} />
              </LocalizationProvider>

            </Stack>
            <TextField
              type="text"
              variant='outlined'
              color='primary'
              label="Region"
              onChange={e => setRegion(e.target.value)}
              value={region}
              sx={{ mb: 4 }}
              fullWidth
              required
            />

            <Box sx={{ justifyContent: "space-between", display: 'flex' }}>

              <Button variant='contained' color='success' sx={{ mr: 1.5 }} onClick={handleCreate} disabled={startTime==null || stopTime==null}>Create Election</Button>
            </Box>
          </AccordionDetails>
          {/* <AccordionActions>
                        <Button variant='contained' color='success' sx={{ mr: 1.5, mb: 1.5 }}>Register</Button>
                    </AccordionActions> */}
        </Accordion>
      </div>

    </>
  );
}

export default election