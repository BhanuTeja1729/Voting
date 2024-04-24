/* eslint-disable react-hooks/rules-of-hooks */
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

import {
  useActiveAccount,
  // useSendTransaction,
} from "thirdweb/react";

const voterRegCard = (props) => {
  const adminContext = useContext(AdminContext);
  const { deleteVoter, handleApprove,getVoterList } = adminContext;
  const { voter } = props;

  const account = useActiveAccount();
  // console.log(account);

  var vName = voter.voterFirstName + " " + voter.voterLastName;
  var vEmail = voter.email;
  var vPhone = voter.phoneNumber;
  var vId = voter.voterId;
  var vAn = voter.aadharNumber;

  var _id = vId;
  var _name = vName;
  var _aadharno = vAn;
  var _email = vEmail;
  var _imgUrl = voter.imgUrl;

  const handleDelete = () => {
    if (voter && voter._id) {
      deleteVoter(voter._id);
      getVoterList();
    } else {
      console.error("Voter or voter._id is undefined.");
    }
  };
  const handApprov = async () => {
    const props = { _aadharno, _email, _id, _imgUrl, _name, account, voter };
    let val = await handleApprove(props);
    getVoterList();
    if (val) {
      console.log("Approved");
    }
  };
  return (
    <>
      {/* {console.log(voter)} */}
      <div className="shadow w-4/5 text-xl">
        {account && (
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
                {console.log(voter._id)}
                <Button
                  variant="contained"
                  color="success"
                  className="absolute top-0 right-0"
                  onClick={handApprov}
                  sx={{ maxHeight: 50, maxWidth: 350 }}
                >
                  <CheckIcon />
                </Button>
              </div>
            </Stack>
          </Card>
        )}
      </div>
    </>
  );
};

export default voterRegCard;
