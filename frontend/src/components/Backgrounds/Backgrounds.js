import React from 'react'
import { Box, Grid, Typography, Button } from "@material-ui/core"
import { useHistory } from "react-router-dom"
import BackgroundSelect from "./BackgroundSelect"

export default function Backgrounds() {

    const history = useHistory()

    function handleBlankBackground() {
        history.push("/draw?background=none")
    }

    function handleGoBack(){
        history.push("/")
    }

    return (
        <Box py={4} style={{
            background: "#E9E9E9",
        }}>

            <Grid container direction="column" align="center" >
                <Grid item>
                    <Typography color="textSecondary" variant="h4">Choose a background</Typography>
                </Grid>
                <Grid item>
                    <BackgroundSelect />
                </Grid>
                <Grid item>
                    <Button onClick={handleBlankBackground} color="primary">Use Blank Background</Button>
                </Grid>
                <Grid item>
                    <Button onClick={handleGoBack} color="secondary">Go Back</Button>
                </Grid>
            </Grid>
        </Box>
    )
}
