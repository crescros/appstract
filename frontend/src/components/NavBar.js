import React from 'react'
import { AppBar, Typography, Grid, Button, Box, Link } from "@material-ui/core"
import { Link as RouterLink } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    link: {
        color: theme.palette.common.white
    }
}))

export default function NavBar() {
    const classes = useStyles()

    return (
        <AppBar
            position="static">
            <Box p={1} pl={5}>
                <Grid container spacing={5} alignItems="center">
                    <Grid item>
                        <Link to="/" component={RouterLink} className={classes.link}>
                            <Typography color="inherit">Appstract</Typography>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/draw" component={RouterLink} className={classes.link}>
                            <Typography>Draw</Typography>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/view" component={RouterLink} className={classes.link}>
                            <Typography>View</Typography>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </AppBar>
    )
}
