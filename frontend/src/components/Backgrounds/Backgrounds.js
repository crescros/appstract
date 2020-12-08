import React from 'react'
import { Box, Grid, Typography, Button } from "@material-ui/core"
import { useHistory } from "react-router-dom"
import BackgroundSelect from "./BackgroundSelect"

export default function Backgrounds() {

    const history = useHistory()

    function handleBlankBackground() {
        history.push("/draw?background=none")
    }

    return (
        <Grid container direction="column" align="center" spacing={3}>
            <Grid item>
                <Typography color="textSecondary" variant="h4">Choose a background</Typography>
            </Grid>
            <Grid item>
                <BackgroundSelect />
            </Grid>
            <Grid item>
                <Button onClick={handleBlankBackground} color="secondary">Use Blank Background</Button>
            </Grid>
        </Grid>
    )
}
