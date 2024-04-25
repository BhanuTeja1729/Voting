import React,{useContext} from 'react';
import { Box, Stack, Card, CardContent, Button } from '@mui/material';
import AdminContext from '../../contexts/admin/adminContext';


const electionCard = ({data}) => {

    const adminContext = useContext(AdminContext);
    const {switchElectionStatus, electionList} = adminContext;

    const handleStatusChange = (index)=>{
        const _id = index
        const props = {_id}
        const changed = switchElectionStatus(props)
        if(changed){
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
                                    <div className="text-xl font-medium">{item.names}</div>
                                    <div className="text-xl font-medium">Status : {item.status.toString()}</div>
                                </Stack>
                                <Button
                                    variant="contained"
                                    color="success"
                                    sx={{ width: "100%", whiteSpace: 'nowrap', mt: 3 }}
                                    onClick={handleStatusChange}
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