"use Client";
import {
  Divider,
  Card,
  Stack,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckIcon from "@mui/icons-material/Check";
import AdminContext from "../../contexts/admin/adminContext";
import { useContext } from "react";

//Contract
import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { resolveMethod } from "thirdweb";
import { useReadContract } from "thirdweb/react";
// import contract from "../../contracts/voter";

const client = createThirdwebClient({
  clientId: "250f4b19ef5e2aa207e6efd1c063c15f",
});

// connect to your contract
const contract = getContract({
  client,
  chain: defineChain(80002),
  address: "0xEdbD70ee113790B97CE5aAC3E3D584A29FfA134b",
});

const voterRegCard = (props) => {
  const adminContext = useContext(AdminContext);
  const { deleteVoter, approveVoter } = adminContext;
  const { voter } = props;
  var vName = voter.voterFirstName + " " + voter.voterLastName;
  var vEmail = voter.email;
  var vPhone = voter.phoneNumber;
  var vId = voter.voterId;
  var vAn = voter.aadharNumber;

  var _voterId = "1";
  var _email = "pammi@gmail.com";

  const handleDelete = () => {
    if (voter && voter._id) {
      deleteVoter(voter._id);
    } else {
      console.error("Voter or voter._id is undefined.");
    }
  };

  const handleApprove = () => {
    if (voter && voter._id) {
      approveVoter(voter._id);
    } else {
      console.error("Voter or voter._id is undefined.");
    }
  };

  const data = useReadContract({
    contract,
    method: resolveMethod("totalVoters"),
    params: [],
  });

  return (
    <>
      {/* {console.log(voter)} */}
      <div className="shadow w-4/5 text-xl">
        <Card sx={{ p: 3 }}>
          <Stack spacing={3} direction={"row"} className="flex flex-row">
            <Stack
              spacing={2}
              direction="column"
              alignItems="flex-start"
              justifyContent="space-between"
              className="basis-2/5"
            >
              <Box>
                <List sx={{ width: "100%", maxWidth: 360, my: 2 }}>
                  <ListItem>
                    <ListItemText primary={`Name: ${vName}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Email: ${vEmail}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Phone Number: ${vPhone}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Voter Id: ${vId}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Aadhar Number: ${vAn}`} />
                  </ListItem>
                </List>
              </Box>
            </Stack>
            <Stack
              spacing={2}
              direction="row"
              alignItems="flex-start"
              className="basis-2/5"
            >
              <Divider orientation="vertical" flexItem />
              <Box>
                <List sx={{ width: "100%", maxWidth: 360, my: 2 }}>
                  <ListItem>
                    <ListItemText primary={`Name: ${vName}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Email: ${vEmail}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Phone Number: ${vPhone}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Voter Id: ${vId}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Aadhar Number: ${vAn}`} />
                  </ListItem>
                </List>
              </Box>
            </Stack>
            <div className="basis-1/5 items-center flex flex-col gap-2 py-12">
              <Button
                variant="contained"
                color="error"
                className="absolute top-0 right-0"
                onClick={handleDelete}
                sx={{ maxHeight: 50, maxWidth: 350 }}
              >
                <DeleteOutlineOutlinedIcon />
              </Button>
              <Button
                variant="contained"
                color="success"
                className="absolute top-0 right-0"
                onClick={handleApprove}
                sx={{ maxHeight: 50, maxWidth: 350 }}
              >
                <CheckIcon />
              </Button>
            </div>
          </Stack>
        </Card>
        <Button onClick={console.log(data)}>Click Me</Button>
      </div>
    </>
  );
};

export default voterRegCard;
