import React, { useRef, useState } from 'react'
import { Button, Grid, Typography, Slider, Box } from "@material-ui/core"
import ColorPicker from 'material-ui-color-picker'
import { useHistory, useLocation } from "react-router-dom"

import { getBackgroundUrlFromId, postDrawing, getCurrentBackgroundId } from "../../functions.js"

import Canvas from "./Canvas"
import UploadModal from "./UploadModal"

export default function Draw() {

    const [brushColor, setBrushColor] = useState("#444")
    const [brushSize, setBrushSize] = useState(12)
    const [uploadModalOpen, setUploadModalOpen] = useState(false)
    const history = useHistory()

    const [drawingName, setDrawingName] = useState()



    const handleUpload = async () => {
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
        <Box align="center">

            <Grid container direction={"column"} style={{ maxWidth: "400px" }} spacing={2}>
                <Grid item>
                    <Canvas {...{ brushColor, canvasRef, brushSize }} imgUrl={getBackgroundUrlFromId(backgroundId)} />
                </Grid>
                <Grid item container>
                    <Grid item xs={2}>
                        <Typography align="center">color </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <ColorPicker
                            style={{ background: brushColor, borderRadius: "100%", width: "32px" }}
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
                        <Button onClick={handleClickShowUpload} variant="contained" color="primary">upload </Button>
                    </Grid>
                </Grid>
            </Grid>

            <UploadModal open={uploadModalOpen} onClose={handleCloseUpload}  {...{ handleChangeNameInput, drawingName, handleUpload }} />
        </Box>
    )
}
