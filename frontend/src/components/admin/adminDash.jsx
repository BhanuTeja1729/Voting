import React from "react";
import { BarChart } from "@mui/x-charts";
import { Link } from "react-router-dom";

import Voter from "./voter";
import Candidate from "./candidate";
import Election from "./election";
import Result from "./result";

import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Button,
  Grid,
  Divider,
} from "@mui/material";

const adminDash = () => {
  let applicants = 50;
  let accepted = 20;
  let pending = 30;

  return (
    <>
      <h1 className="mb-10 text-center text-3xl font-semibold mt-20">
        Admin Dashboard
      </h1>
      <Box sx={{marginLeft:35}}>
        <Grid container spacing={6}>
          <Grid item xs={3}>
            <Link to={"../voter"}>
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: 35,
                      fontWeight: "semibold",
                    }}
                  >
                    VOTERS
                  </Typography>
                  <Divider />
                  <br />
                  <Stack
                    spacing={4}
                    sx={{ bgcolor: "white" }}
                    direction="row"
                    useFlexGap
                    flexWrap="wrap"
                  >
                    <Box
                      sx={{
                        borderRadius: 1,
                        padding: 3,
                        fontSize: 35,
                        fontWeight: 500,
                        bgcolor: "grey",
                      }}
                    >
                      {applicants}
                    </Box>
                    <Box
                      sx={{
                        borderRadius: 1,
                        padding: 3,
                        fontSize: 35,
                        fontWeight: 500,
                        bgcolor: "grey",
                      }}
                    >
                      {accepted}
                    </Box>
                    <Box
                      sx={{
                        borderRadius: 1,
                        padding: 3,
                        fontSize: 35,
                        fontWeight: 500,
                        bgcolor: "grey",
                      }}
                    >
                      {pending}
                    </Box>
                  </Stack>
                  <Stack
                    spacing={6}
                    padding={1}
                    direction="row"
                    useFlexGap
                    flexWrap="wrap"
                  >
                    <Typography color="initial">Applicants</Typography>
                    <Typography color="initial">Accepted</Typography>
                    <Typography color="initial">Pending</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Link>
          </Grid>

          <Grid item xs={3}>
            <Link to={"../candidate"}>
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: 35,
                      fontWeight: "semibold",
                    }}
                  >
                    CANDIDATES
                  </Typography>
                  <Divider />
                  <br />
                  <Stack
                    spacing={4}
                    sx={{ bgcolor: "white" }}
                    direction="row"
                    useFlexGap
                    flexWrap="wrap"
                  >
                    <Box
                      sx={{
                        borderRadius: 1,
                        padding: 3,
                        fontSize: 35,
                        fontWeight: 500,
                        bgcolor: "grey",
                      }}
                    >
                      {applicants}
                    </Box>
                    <Box
                      sx={{
                        borderRadius: 1,
                        padding: 3,
                        fontSize: 35,
                        fontWeight: 500,
                        bgcolor: "grey",
                      }}
                    >
                      {accepted}
                    </Box>
                    <Box
                      sx={{
                        borderRadius: 1,
                        padding: 3,
                        fontSize: 35,
                        fontWeight: 500,
                        bgcolor: "grey",
                      }}
                    >
                      {pending}
                    </Box>
                  </Stack>
                  <Stack
                    spacing={6}
                    direction={"row"}
                    padding={1}
                    useFlexGap
                    flexWrap="wrap"
                  >
                    <Typography color="initial">Applicants</Typography>
                    <Typography color="initial">Accepted</Typography>
                    <Typography color="initial">Pending</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Link>
          </Grid>

          <Grid item xs={3}>
            <Link to={"../election"}>
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: 35,
                      fontWeight: "semibold",
                    }}
                  >
                    ELECTIONS
                  </Typography>
                  <Divider />
                  <br />
                  <Stack
                    spacing={4}
                    sx={{ bgcolor: "white" }}
                    direction="row"
                    useFlexGap
                    flexWrap="wrap"
                  >
                    <Box
                      sx={{
                        borderRadius: 1,
                        padding: 3,
                        fontSize: 35,
                        fontWeight: 500,
                        bgcolor: "grey",
                      }}
                    >
                      {applicants}
                    </Box>
                    <Box
                      sx={{
                        borderRadius: 1,
                        padding: 3,
                        fontSize: 35,
                        fontWeight: 500,
                        bgcolor: "grey",
                      }}
                    >
                      {accepted}
                    </Box>
                    <Box
                      sx={{
                        borderRadius: 1,
                        padding: 3,
                        fontSize: 35,
                        fontWeight: 500,
                        bgcolor: "grey",
                      }}
                    >
                      {pending}
                    </Box>
                  </Stack>
                  <Stack
                    spacing={6}
                    direction={"row"}
                    padding={1}
                    useFlexGap
                    flexWrap="wrap"
                  >
                    <Typography color="initial">Applicants</Typography>
                    <Typography color="initial">Accepted</Typography>
                    <Typography color="initial">Pending</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        </Grid>

        <Link to={"../result"}>
          <Card variant="outlined" sx={{ maxWidth: "74%", mt: 5 }}>
            <CardContent>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: 35,
                  fontWeight: "semibold",
                }}
              >
                RESULTS
              </Typography>
              <Divider />
              <div className="flex justify-center">
                <BarChart
                  series={[
                    { data: [3, 4, 5, 8], label: "Party 1" },
                    { data: [4, 3, 6, 3], label: "Party 2" },
                  ]}
                  width={600}
                  height={350}
                  sx={{ mt: 5 }}
                />
              </div>
            </CardContent>
          </Card>
        </Link>
      </Box>
    </>
  );
};

export default adminDash;
