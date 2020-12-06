import React, { useRef, useState } from 'react'
import CanvasDraw from "react-canvas-draw";
import { Button, TextField } from "@material-ui/core"
import ColorPicker from 'material-ui-color-picker'


import { useHistory } from "react-router-dom"

import { postDrawing } from "../functions.js"

export default function Draw() {
    const [drawingName, setDrawingName] = useState()
    const [brushColor, setBrushColor] = useState("#444")

    const history = useHistory()

    const canvasRef = useRef(null)

    const handleClick = async () => {
        const data = canvasRef.current.getSaveData()
        const response = await postDrawing({
            "name": drawingName || "untitled",
            "drawing": data,
            "uploadedAt": new Date()
        })

        console.log(response)

        history.push("/view")
    }

    const handleChangeNameInput = (e) => {
        console.log(e.target.value)
        setDrawingName(e.target.value)
    }

    return (
        <div>
            <TextField
                value={drawingName}
                label="picture name"
                onChange={handleChangeNameInput}
            />
            <CanvasDraw
                ref={canvasRef}
                brushColor={brushColor}
            />
            <ColorPicker
                name='color'

                value={brushColor} 
                onChange={color => setBrushColor(color)}
            />
            <Button onClick={handleClick} variant="contained" color="secondary">upload </Button>
        </div>
    )
}
