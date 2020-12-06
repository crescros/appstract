import React, { useRef, useState } from 'react'
import CanvasDraw from "react-canvas-draw";
import { Button, TextField } from "@material-ui/core"

import { useHistory } from "react-router-dom"

import { postDrawing } from "../functions.js"

export default function Draw() {
    const [drawingName, setDrawingName] = useState("New Drawing")

    const history = useHistory()

    const canvasRef = useRef(null)

    const handleClick = () => {
        const data = canvasRef.current.getSaveData()
        postDrawing({
            "name": drawingName, 
            "drawing": data,
            "uploadedAt": new Date()
        })
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
                label="name"
                onChange={handleChangeNameInput}
            />
            <CanvasDraw
                ref={canvasRef}
            />
            <Button onClick={handleClick} variant="contained" color="secondary">upload </Button>
        </div>
    )
}
