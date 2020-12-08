import React, { useEffect } from 'react'
import CanvasDraw from "react-canvas-draw";

export default function Canvas({ brushColor, canvasRef, brushSize, imgUrl }) {

    useEffect(()=>{
        document.querySelectorAll("canvas")[3].style.zIndex = 14
    },[])

    return (
        <div>
            <CanvasDraw
                ref={canvasRef}
                brushColor={brushColor}
                lazyRadius={4}
                brushRadius={brushSize}
                canvasWidth={400}
                imgSrc={imgUrl}
            />
        </div>
    )
}
