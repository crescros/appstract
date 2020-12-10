import React, { useEffect, useState } from 'react'
import CanvasDraw from "react-canvas-draw";
import { Box, Typography, IconButton, Grid, Menu, MenuItem, Button } from "@material-ui/core"
import MoreVert from "@material-ui/icons/MoreVert"
import { getDrawings, removeDrawing, getBackgroundUrlFromId, bringBackgroundToFront } from "../../functions"
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import { useHistory } from "react-router-dom"

const darkTheme = createMuiTheme({
    palette: {
        background: {
            default: "#141414",
        },
        type: "dark",
    },
    shadows: ["none"],
});

const timeFormattingOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

export default function View() {

    const history = useHistory()

    const [drawings, setDrawings] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        (async () => {

            const newDrawings = await getDrawings(page)

            setDrawings(drawings => drawings.concat(newDrawings.data))


            document.querySelectorAll("canvas").forEach(node => {
                node.style.zIndex = 14
            })
        })()
    }, [page])
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

    const handleSeeMore = () => {
        setPage(page => page + 1)
        console.log(page)
    }

    function handleDrawSomething() {
        history.push("/backgrounds")
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />

            <Box align="center" mb={6} pt={4}>
                <Button variant='contained' color="primary" onClick={handleDrawSomething}>Draw Something</Button>
            </Box>
            {drawings.map(img => {

                return <Box mb={8} align="center">
                    <CanvasDraw
                        style={{ pointerEvents: "none", overflowX: "scroll" }}
                        saveData={img.data}
                        brushRadius={0}
                        lazyRadius={0}
                        hideGrid={true}
                        disabled={true}
                        imgSrc={getBackgroundUrlFromId(img.background_id)}
                        canvasWidth={img.width}
                    />

                    <Box p={3}>


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
                                <Typography color="textSecondary">uploaded {(new Date(img.uploadedAt)).toLocaleDateString(undefined, timeFormattingOptions)}</Typography>
                            </Grid>
                        </Grid>
                    </Box>

                </Box>
            })}
            <Box align="center" mb={6} pt={4}>
                <Button variant='contained' color="primary" onClick={handleSeeMore}>See More</Button>
            </Box>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleClickRemove(img.id, img.name)}>Remove</MenuItem>
            </Menu>
        </ThemeProvider>
    )
}
