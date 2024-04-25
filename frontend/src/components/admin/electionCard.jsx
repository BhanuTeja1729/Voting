import React,{useContext} from 'react';
import { Box, Stack, Card, CardContent, Button } from '@mui/material';
import AdminContext from '../../contexts/admin/adminContext';


const electionCard = ({data, getElectionList}) => {

    const adminContext = useContext(AdminContext);
    const {switchElectionStatus, electionList} = adminContext;

    const handleStatusChange = async (id)=>{
        const _id = id
        const props = {_id}
        const changed = await switchElectionStatus(props)
        if(changed){
            getElectionList();
            console.log("Election status Updated")
        }
        else{
            console.log("Election status not Updated")
        }
    }

    return (
        <>
            <Box
                sx={{
                    mt: 4,
                    mb: 6,
                    boxShadow: 1,
                    padding: 5,
                    // maxHeight: "calc(100vh - 420px)",
                    // overflow: "auto",
                }}
            >
                <Stack
                    spacing={5}
                    direction="row"
                    sx={{ justifyContent: "space-between" }}
                    textAlign={"center"}
                    useFlexGap
                    flexWrap="wrap"
                >

                    {data.map((item) => (
                        <Card key={item.id} sx={{ width: "15%" }}>
                            <CardContent sx={{ marginBottom: "1rem" }}>
                                <Stack spacing={2} direction="column">
                                    <div className="text-xl font-medium">{item.name}</div>
                                    <div className="text-xl font-medium">Status : {item.status.toString()}</div>
                                </Stack>
                                <Button
                                    variant="contained"
                                    color="success"
                                    sx={{ width: "100%", whiteSpace: 'nowrap', mt: 3 }}
                                    onClick={()=>handleStatusChange(item.id)}
                                >
                                    Status Update
                                </Button>
                            </CardContent>
                        </Card>
                    ))}

                </Stack>
            </Box>
        </>
    )
}

export default electionCard