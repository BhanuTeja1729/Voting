import React from "react";
import { PieChart } from "@mui/x-charts";
import { Link } from "react-router-dom";

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

      <Box sx={{mr:7}}>
        <h1 className="mb-5 text-3xl font-semibold mt-20">
          Admin Dashboard
        </h1>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Link to={"../voter"}>
              <Card variant="outlined" max>
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

          <Grid item xs={4}>
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

          <Grid item xs={4} sx={{ mr: 0 }}>
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
          <Card variant="outlined" sx={{ maxWidth: "74%", mt: 5, mb: 4 }}>
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
        </Link>
      </Box>
    </>
  );
};

export default adminDash;
