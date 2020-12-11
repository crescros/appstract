import React, { useState } from 'react'
import { Dialog, Typography, Button, Box, Grid } from "@material-ui/core"

const colors = [
    "#eeeeee", "#fdd0cd", "#ffeed4", "#fdf9de", "#d5e6d3", "#d0dcff",
    "#afafaf", "#ff7e7e", "#fed17c", "#fdf2a4", "#80be7d", "#7c9eff",
    "#4d4d4d", "#fc2c2c", "#ffb231", "#fde541", "#279029", "#114fff",
    "#252525", "#c90004", "#c88500", "#cab000", "#015601", "#0d3ec9",
    "#111111", "#820003", "#825600", "#817100", "#003800", "#072371",
]

export default function ColorPicker({ brushColor, setBrushColor }) {
    const [open, setOpen] = useState(false)

    function handleClose() {
        setOpen(false)
    }

    function handleClickOpen() {
        setOpen(true)
    }

    function handleClickColor(color) {
        setBrushColor(color)
        handleClose()
    }



    return (
        <div>
            <Box
                onClick={handleClickOpen}
                style={{
                    background: brushColor,
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%"
                }}
            />
            <Dialog open={open} onClose={handleClose}>
                <Box p={4}>

                    <Typography p={2}>pick a color</Typography>
                    <Grid container justify="center">
                        {
                            colors.map(color => {
                                return <Grid item xs={2}>
                                    <Box align="center">
                                        <Box
                                            onClick={() => handleClickColor(color)}
                                            style={{
                                                background: color,
                                                width: "48px",
                                                height: "48px",
                                                borderRadius: "50%"
                                            }}
                                        />
                                    </Box>
                                </Grid>
                            })
                        }
                    </Grid>
                </Box>
            </Dialog>
        </div>
    )
}
