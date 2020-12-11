import React, { useState } from 'react'
import MoreVert from "@material-ui/icons/MoreVert"
import {
    Box,
    Typography,
    IconButton,
    Grid, Menu,
    MenuItem
} from "@material-ui/core"

const timeFormattingOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
};

export default function Plauque({ img }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickRemove = () => {
        if (confirm('Are you sure you want to delete drawing "' + img.name + '"?')) {
            removeDrawing(img.id)
            location.reload()
        } else {
            handleClose()
        }
    }

    return (
        <Box py={3}>
            <Grid container justify="center">
                <Grid container item justify="center">
                    <Grid item>
                        <Typography variant="h4">{img.name}</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            <MoreVert />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography color="textSecondary">
                        uploaded {(new Date(img.created_at)).toLocaleDateString(undefined, timeFormattingOptions)}
                    </Typography>
                </Grid>
            </Grid>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClickRemove}>Remove</MenuItem>
            </Menu>
        </Box>
    )
}
