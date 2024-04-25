import React from 'react';
import { Box, Stack, Card, CardContent, Button } from '@mui/material';

const electionCard = () => {

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

                    <Card key={index} sx={{ width: "15%" }}>
                        <CardContent sx={{ marginBottom: "1rem" }}>
                            <Stack spacing={2} direction="column">
                                <div className="text-xl font-medium">{item.name}</div>
                                <div className="text-xl font-medium">{item.status}</div>
                            </Stack>

                            <Button
                                variant="contained"
                                color="success"
                                sx={{ width: "100%", whiteSpace: 'nowrap', mt: 3 }}
                            >
                                Status Update
                            </Button>

                        </CardContent>
                    </Card>

                </Stack>
            </Box>
        </>
    )
}

export default electionCard