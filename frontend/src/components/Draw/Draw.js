import React, { useRef, useState } from 'react'
import { Button, TextField, Grid, Typography, Slider, Select, MenuItem, InputLabel } from "@material-ui/core"
import ColorPicker from 'material-ui-color-picker'

import { useHistory, useLocation } from "react-router-dom"

import { getBackgroundUrlFromId, postDrawing } from "../../functions.js"

import Canvas from "./Canvas"

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

export default function Draw() {

    let query = useQuery()

    const [drawingName, setDrawingName] = useState()
    const [brushColor, setBrushColor] = useState("#444")
    const [brushSize, setBrushSize] = useState(12)
    let backgroundId = query.get("background")

    if (!backgroundId) backgroundId = "none"

    const history = useHistory()

    const canvasRef = useRef(null)

    const handleClickUpload = async () => {
        if (!confirm("upload the drawing?")) return;
        const data = canvasRef.current.getSaveData()
        const response = await postDrawing({
            "name": drawingName || "untitled",
            "drawing": data,
            "uploadedAt": new Date(),
            "backgroundId": backgroundId
        })

        history.push("/view")
    }

    const handleChangeNameInput = (e) => {
        setDrawingName(e.target.value)
    }

    const handleChangeSlider = (e, newValue) => {
        setBrushSize(newValue)
    }

    const handleClickUndo = () => {
        canvasRef.current.undo()
    }

    const handleClickClear = () => {
        if (!confirm("are you sure you want to clear the entire drawing? ")) return;
        canvasRef.current.clear()
    }

    const handleChangeBackground = (e, newValue) => {
        location.href = "/draw?background=" + newValue.props.value
    }


    return (
        <Grid container direction={"column"} style={{ maxWidth: "400px" }} spacing={2}>
            <Grid item>
                <InputLabel>Background</InputLabel>
                <Select label="background" name="background" onChange={handleChangeBackground} value={backgroundId} style={{ minWidth: "100px" }}>
                    <MenuItem value="none">None</MenuItem>
                    <MenuItem value="1">Background 1</MenuItem>
                    <MenuItem value="2">Background 2</MenuItem>
                    <MenuItem value="3">Background 3</MenuItem>
                    <MenuItem value="4">Background 4</MenuItem>
                    <MenuItem value="5">Background 5</MenuItem>
                    <MenuItem value="6">Background 6</MenuItem>
                </Select>
            </Grid>
            <Grid item>
                <TextField
                    value={drawingName}
                    label="picture name"
                    onChange={handleChangeNameInput}
                />
            </Grid>
            <Grid item>
                <Canvas {...{ brushColor, canvasRef, brushSize }} imgUrl={getBackgroundUrlFromId(backgroundId)} />
            </Grid>
            <Grid item container>
                <Grid item xs={2}>
                    <Typography align="center">color </Typography>
                </Grid>
                <Grid item xs={2}>
                    <ColorPicker
                        style={{ background: brushColor, borderRadius: "12px", width: "100%" }}
                        defaultValue="brush color"
                        name='color'
                        value={brushColor}
                        onChange={color => setBrushColor(color)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Typography align="center">size </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Slider min={1} onChange={handleChangeSlider} value={brushSize} />
                </Grid>
            </Grid>
            <Grid item container justify="space-around">
                <Grid item>
                    <Button onClick={handleClickClear} variant="contained" color="secondary">clear </Button>
                </Grid>
                <Grid item>
                    <Button onClick={handleClickUndo} variant="contained" color="secondary">undo </Button>
                </Grid>
                <Grid item>
                    <Button onClick={handleClickUpload} variant="contained" color="primary">upload </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}
