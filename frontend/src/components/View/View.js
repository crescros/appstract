import React, { useEffect, useState } from 'react'
import CanvasDraw from "react-canvas-draw";
import { Box, Typography, IconButton, Grid, Menu, MenuItem } from "@material-ui/core"
import MoreVert from "@material-ui/icons/MoreVert"
import { getDrawings, removeDrawing, getBackgroundUrlFromId, bringBackgroundToFront } from "../../functions"

const timeFormattingOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
export default function View() {

    const [drawings, setDrawings] = useState([])

    useEffect(() => {
        (async () => {
            setDrawings(await getDrawings())
            document.querySelectorAll("canvas").forEach(node => {
                node.style.zIndex = 14
            })
        })()
    }, [])
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickRemove = (id, name) => {
        if (confirm('Are you sure you want to delete drawing "' + name + '"?')) {
            removeDrawing(id)
            location.reload()
        } else {
            handleClose()
        }
    }

    return (
        <div>

            {drawings.data?.map(img => {
                return <Box mb={8}>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => handleClickRemove(img.id, img.name)}>Remove</MenuItem>
                    </Menu>
                    <Grid container>
                        <Grid item>
                            <Typography variant="h4">{img.name}</Typography>
                        </Grid>
                        <Grid item>
                            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                <MoreVert />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Typography color="textSecondary">uploaded {(new Date(img.uploadedAt)).toLocaleDateString(undefined, timeFormattingOptions)}</Typography>
                    <CanvasDraw
                        style={{ pointerEvents: "none", overflowX: "scroll" }}
                        saveData={img.drawing}
                        brushRadius={0}
                        lazyRadius={0}
                        hideGrid={true}
                        disabled={true}
                        imgSrc={getBackgroundUrlFromId(img.backgroundId)}
                    />
                </Box>
            })}
        </div>
    )
}
