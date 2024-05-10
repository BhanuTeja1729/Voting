import { useState } from "react";

import { Box, Card, Stack, Typography, Button, Divider } from "@mui/material";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const candidateCard = (props) => {
  const { candidate } = props;

  return (
    <>
      <div className="shadow w-4/5 mt-4">
        <Card sx={{ p: 3, mt: 2}}>
          <Stack
            spacing={3}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box sx={{ maxHeight: 100, maxWidth: 60, p: 0.5 }}>
              <img src={candidate.cimg} alt="Candidate Image" />
            </Box>
            <Divider orientation="vertical" flexItem />
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              Name:{" "}
              {candidate.name}
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              Ward. No: {candidate.wardNo}
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              Party: {candidate.party}
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Button variant="outlined" color="error">
              <DeleteOutlineOutlinedIcon />
            </Button>
          </Stack>
        </Card>
      </div>
    </>
  );
};

export default candidateCard;
