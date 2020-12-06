import React from 'react'
import { AppBar, Typography, Grid, Button, Box, Link } from "@material-ui/core"
import { Link as RouterLink } from "react-router-dom"

export default function NavBar() {
    return (
        <AppBar
            position="static">
            <Box p={1} pl={5}>
                <Grid container spacing={5} alignItems="center">
                    <Grid item>
                        <Link to="/" component={RouterLink} color="textPrimary">
                            <Typography color="inherit">Appstract</Typography>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/draw" component={RouterLink} color="textPrimary">
                            <Typography>Draw</Typography>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/view" component={RouterLink} color="textPrimary">
                            <Typography>View</Typography>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </AppBar>
    )
}
