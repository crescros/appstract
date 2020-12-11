import React from 'react'
import CanvasDraw from "react-canvas-draw";
import { getBackgroundUrlFromId } from "../../functions"

export default function Canvas({img}) {
    return (
        <CanvasDraw
        style={{ pointerEvents: "none", overflowX: "scroll", maxWidth:"100%" }}
        saveData={img.data}
        brushRadius={0}
        lazyRadius={0}
        hideGrid={true}
        disabled={true}
        imgSrc={getBackgroundUrlFromId(img.background_id)}
        canvasWidth={img.width}
    />
    )
}
