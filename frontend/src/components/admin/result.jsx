import React from 'react'
import { PieChart } from "@mui/x-charts";
import eImg from '/user.jpeg'
import {
  Card,
  CardContent,
  Box,
  Divider,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  Stack
} from "@mui/material";

let eName = "Pammi"
let eVotes = "35245"

const result = () => {
  return (
    <>
      <Box className="mb-8 text-3xl font-semibold mt-20">
        <Card variant="outlined" sx={{ maxWidth: "100%", mt: 5, mb: 4, mr:5}}>
          <CardContent>
            <div className="text-center text-4xl font-semibold mb-4">
              RESULTS
            </div>
            <Divider />
            <div className="flex justify-center">
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: 'series A' },
                      { id: 1, value: 15, label: 'series B' },
                      { id: 2, value: 20, label: 'series C' }
                    ],
                  },
                ]}
                width={400}
                height={200}
                sx={{ mt: 5 }}
              />
            </div>
          </CardContent>
        </Card>
      </Box>
      <Stack spacing={3} direction={"row"} useFlexGap flexWrap="wrap" marginBottom={5}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
          <div className="text-center text-2xl font-semibold mb-4">
              <img src="/user.jpeg" alt="" />
            </div>
            <Divider />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <Box component="section" sx={{textAlign:"center", fontSize:18, fontWeight:"medium", width:"100%"}}>Candidate Name : {eName}</Box>
                <Box component="section" sx={{textAlign:"center", fontSize:18, fontWeight:"normal", width:"100%"}}>No. of Votes : {eVotes}</Box>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Stack>
    </>
  )
}

export default result