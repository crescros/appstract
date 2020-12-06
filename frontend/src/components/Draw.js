import React, { useRef, useState } from 'react'
import CanvasDraw from "react-canvas-draw";
import { Button, TextField, Grid, Typography, Slider } from "@material-ui/core"
import ColorPicker from 'material-ui-color-picker'

import { useHistory } from "react-router-dom"

import { postDrawing } from "../functions.js"

export default function Draw() {
    const [drawingName, setDrawingName] = useState()
    const [brushColor, setBrushColor] = useState("#444")
    const [brushSize, setBrushSize] = useState(12)

    const history = useHistory()

    const canvasRef = useRef(null)

    const handleClick = async () => {
        const data = canvasRef.current.getSaveData()
        const response = await postDrawing({
            "name": drawingName || "untitled",
            "drawing": data,
            "uploadedAt": new Date()
        })

        history.push("/view")
    }

    const handleChangeNameInput = (e) => {
        setDrawingName(e.target.value)
    }

    const handleChangeSlider = (e, newValue) => {
        setBrushSize(newValue)
    }

    return (
        <Grid container direction={"column"} style={{ maxWidth: "400px" }} spacing={2}>
            <Grid item>
                <TextField
                    value={drawingName}
                    label="picture name"
                    onChange={handleChangeNameInput}
                />
            </Grid>
            <Grid item>
                <CanvasDraw
                    ref={canvasRef}
                    brushColor={brushColor}
                    lazyRadius={0}
                    brushRadius={brushSize }
                />
            </Grid>
            <Grid item container>
                <Grid item xs={4}>
                    <Typography>brush color </Typography>
                </Grid>
                <Grid item xs={8}>
                    <ColorPicker
                        style={{ background: brushColor, borderRadius: "12px", width: "100%"}}
                        defaultValue="brush color"
                        name='color'
                        value={brushColor}
                        onChange={color => setBrushColor(color)}
                    />
                </Grid>
            </Grid>
            <Grid item container>
                <Grid item xs={4}>
                    <Typography>brush size </Typography>
                </Grid>
                <Grid item xs={8}>
                    <Slider onChange={handleChangeSlider} value={brushSize}/>
                </Grid>
            </Grid>
            <Grid item>
                <Button onClick={handleClick} variant="contained" color="secondary">upload </Button>
            </Grid>
        </Grid>
    )
}
