import React from 'react'
import { Typography, Box, Button, Grid } from "@material-ui/core"
import { useHistory } from "react-router-dom"

export default function Home() {
    const history = useHistory()

    function handleDrawSomething(){
        history.push("/backgrounds")
    }
    
    function handleLookAtDrawings(){
        history.push("/view")
    }

    return (
        <Box mt={2}p={4} align="center">
            <Grid container style={{maxWidth: 420}} direction="column" spacing={4}>
                <Grid item>
                    <Typography variant="h4" color="textSecondary">Welcome to</Typography>
                    <Typography variant="h3" align="center" gutterBottom>Appstract</Typography>
                    <Typography align="center" gutterBottom>We are currently in develop mode, which means your drawings will only be stored for a few minutes or less. </Typography>
                    <Typography align="center" gutterBottom>Feel free to upload as many drawings as much as you want - it will help us with testing! </Typography>
                </Grid>
                <Grid item>
                    <Button onClick={handleDrawSomething} color="primary" variant="contained">Draw Something </Button>
                </Grid >
                <Grid item>
                    <Button onClick={handleLookAtDrawings} color="primary">Look at Drawings</Button>
                </Grid >

            </Grid>
        </Box>
    )
}
