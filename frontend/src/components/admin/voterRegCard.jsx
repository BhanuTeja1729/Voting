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
import { toast } from "react-toastify";

const voterRegCard = (props) => {
  const adminContext = useContext(AdminContext);
  const { deleteVoter, handleApprove, getVoterList } = adminContext;
  const { voter } = props;

  const account = useActiveAccount();
  // console.log(account);

  var vName = voter.voterFirstName + " " + voter.voterLastName;
  var vEmail = voter.email;
  var vPhone = voter.phoneNumber;
  var vId = voter.voterId;
  var vAn = voter.aadharNumber;
  var vImg = voter.imgUrl;

  var _id = vId;
  var _name = vName;
  var _aadharno = vAn;
  var _email = vEmail;
  var _imgUrl = voter.imgUrl;

  const handleDelete = () => {
    if (voter && voter._id) {
      deleteVoter(voter._id);
      getVoterList();
      toast.success("Voter Deleted Successfully")
    } else {
      toast.error("Voter Deletion.");
    }
  };
  const handApprov = async () => {
    const props = { _aadharno, _email, _id, _imgUrl, _name, voter };
    let val = await handleApprove(props);
    getVoterList();
    if (val) {
      toast.success("Voter Approved");
    }
  };
  return (
    <>
      {/* {console.log(voter)} */}
      <div className="shadow w-4/5 text-xl">
        {account && (
          <Card sx={{ p: 3, width:"115%" }}>
            <Stack direction="row" spacing={3} alignItems="center" >
              {/* Left Column with Image and Details */}
              <Stack direction="row" spacing={2} flexBasis="40%">
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ width: '200px' }}>
                  <img src={vImg} alt="Voter Image" style={{ width: '100%', maxWidth: '200px' }} />
                </Box>
                <Box>
                  <List sx={{ width: '100%', maxWidth: 450 }}>
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

              {/* Divider */}
              <Divider orientation="vertical" flexItem />

              {/* Right Column with Image and Details */}
              <Stack direction="row" spacing={2} flexBasis="40%">
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ width: '200px' }}>
                  <img src={vImg} alt="Voter Image" style={{ width: '100%', maxWidth: '200px' }} />
                </Box>
                <Box>
                  <List sx={{ width: '100%', maxWidth: 450 }}>
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

              {/* Action Buttons */}
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" flexBasis="20%">
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                  sx={{ minWidth: 50, minHeight: 50, mb: 2 }}
                >
                  <DeleteOutlineOutlinedIcon />
                </Button>
              
                <Button
                  variant="contained"
                  color="success"
                  onClick={handApprov}
                  sx={{ minWidth: 50, minHeight: 50 }}
                >
                  <CheckIcon />
                </Button>
              </Box>
            </Stack>
          </Card>

        )}
      </div>
    </>
  );
};

export default voterRegCard;
