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
import voterContract from "../../contracts/voter";
import { prepareContractCall, resolveMethod, sendTransaction, hexToNumber } from "thirdweb";
import {
  useActiveAccount,
  useReadContract,
  useSendTransaction,
} from "thirdweb/react";

const voterRegCard = (props) => {
  const adminContext = useContext(AdminContext);
  const { deleteVoter, approveVoter } = adminContext;
  const { voter } = props;

  const account = useActiveAccount();
  // console.log(account);

  var vName = voter.voterFirstName + " " + voter.voterLastName;
  var vEmail = voter.email;
  var vPhone = voter.phoneNumber;
  var vId = voter.voterId;
  var vAn = voter.aadharNumber;

  var _id = "112";
  var _name = "voter12";
  var _aadharno = "ano";
  var _email = "mail";
  var _imgUrl = "url";

  const handleDelete = () => {
    if (voter && voter._id) {
      deleteVoter(voter._id);
    } else {
      console.error("Voter or voter._id is undefined.");
    }
  };

  const handleApprove = async () => {
    try {
      const transaction = await prepareContractCall({
        contract: voterContract,
        method: resolveMethod("addVoter"),
        params: [_id, _name, _aadharno, _email, _imgUrl],
      });
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });
      if(transactionHash){
      const approved = await approveVoter(voter._id);
      console.log({
        message: "Voter Approved Successfully",
        hash: transactionHash,
        approved
      });
    }
    } catch (error) {
      console.log("Voter Not Approved In Frontend");
      console.log(error)
    }
  };

  const { data, isLoading } = useReadContract({
    contract: voterContract,
    method: resolveMethod("totalVoters"),
    params: [],
  });

  if (!isLoading) {
    console.log(hexToNumber(data));
  }

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
                  onClick={handleApprove}
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
