import React, { useRef, useState } from 'react'
import { Button, TextField, Grid, Typography, Slider, Select, MenuItem } from "@material-ui/core"
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
    const backgroundId = query.get("background")

    const history = useHistory()

    const canvasRef = useRef(null)

    const handleClickUpload = async () => {
        if (!confirm("upload the image?")) return;
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
        if (!confirm("are you sure you want to clear the entire image? ")) return;
        canvasRef.current.clear()
    }

    const handleChangeBackground = (e, newValue) => {
        location.href = "/draw?background=" + newValue.props.value
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
                <Canvas {...{ brushColor, canvasRef, brushSize }} imgUrl={getBackgroundUrlFromId(backgroundId)} />
            </Grid>
            <Grid item container>
                <Grid item xs={4}>
                    <Typography>brush color </Typography>
                </Grid>
                <Grid item xs={8}>
                    <ColorPicker
                        style={{ background: brushColor, borderRadius: "12px", width: "100%" }}
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
                    <Slider onChange={handleChangeSlider} value={brushSize} />
                </Grid>
            </Grid>
            <Grid item container>
                <Grid item xs={4}>
                    <Typography>background</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Select onChange={handleChangeBackground} value={backgroundId} >
                        <MenuItem value="" >None</MenuItem>
                        <MenuItem value="1">Background 1</MenuItem>
                    </Select>
                </Grid>
            </Grid>
            <Grid item>
                <Button onClick={handleClickUndo} variant="contained" color="secondary">undo </Button>
            </Grid>
            <Grid item>
                <Button onClick={handleClickClear} variant="contained" color="secondary">clear </Button>
            </Grid>
            <Grid item>
                <Button onClick={handleClickUpload} variant="contained" color="secondary">upload </Button>
            </Grid>
        </Grid>
    )
}
