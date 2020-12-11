import React, { useRef, useState, useEffect } from 'react'
import { Button, Grid, Typography, Slider, Box } from "@material-ui/core"
import ColorPicker from './ColorPicker'
import { useHistory } from "react-router-dom"

import { getBackgroundUrlFromId, postDrawing, getCurrentBackgroundId, getScreenWidth } from "../../functions.js"

import Canvas from "./Canvas"
import UploadModal from "./UploadModal"

export default function Draw() {

    const [brushColor, setBrushColor] = useState("#444")
    const [brushSize, setBrushSize] = useState(12)
    const [uploadModalOpen, setUploadModalOpen] = useState(false)
    const [drawingName, setDrawingName] = useState()

    const history = useHistory()

    const [canvasWidth, setCanvasWidth] = useState(400)
    useEffect(() => {
        let screenWidth = getScreenWidth()
        if (screenWidth < 400) setCanvasWidth(screenWidth)
    }, [])

    const handleUpload = async () => {
        const data = canvasRef.current.getSaveData()
        const response = await postDrawing({
            "name": drawingName || "untitled",
            "data": data,
            "backgroundId": backgroundId,
            "width": canvasWidth
        })

        history.push("/view")
    }

    const handleChangeNameInput = (e) => {
        setDrawingName(e.target.value)
    }

    const canvasRef = useRef(null)

    let backgroundId = getCurrentBackgroundId()

    const handleClickShowUpload = () => {
        setUploadModalOpen(true)
    }

    const handleCloseUpload = () => {
        setUploadModalOpen(false)
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

    return (
        <Box align="center" py={4} style={{
            background: "#ccc",
            height: "100vh"
        }}>
            <Grid container style={{ maxWidth: "400px" }} spacing={2}>
                <Grid item xs={12}>
                    <Canvas {...{ brushColor, canvasRef, brushSize, canvasWidth }} imgUrl={getBackgroundUrlFromId(backgroundId)} />
                </Grid>
                <Grid item xs={2}>
                    <Typography align="center">color </Typography>
                </Grid>
                <Grid item xs={2}>
                    <ColorPicker
                        {...{brushColor, setBrushColor}}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Typography align="center">size </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Slider min={1} onChange={handleChangeSlider} value={brushSize} />
                </Grid>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={3}>
                    <Button onClick={handleClickClear} variant="contained" color="secondary">clear </Button>
                </Grid>
                <Grid item xs={3}>
                    <Button onClick={handleClickUndo} variant="contained" color="secondary">undo </Button>
                </Grid>
                <Grid item xs={5}>
                    <Button onClick={handleClickShowUpload} variant="contained" color="primary">upload </Button>
                </Grid>

            </Grid>

            <UploadModal open={uploadModalOpen} onClose={handleCloseUpload}  {...{ handleChangeNameInput, drawingName, handleUpload }} />
        </Box>
    )
}
