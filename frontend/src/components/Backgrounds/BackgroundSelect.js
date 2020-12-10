import React, { useEffect, useState } from 'react'
import { Typography, Box, Button } from "@material-ui/core"
import { getBackgroundUrlFromId } from "../../functions"
import Carousel from 'react-material-ui-carousel'

export default function BackgroundSelect() {

    const [canvasWidth, setCanvasWidth] = useState(400)
    useEffect(() => {
        let screenWidth = window.innerWidth - 22
        console.log(screenWidth)
        if (screenWidth < 400) setCanvasWidth(screenWidth)
    }, [])


    const handleChooseBackground = (id) => {
        location.href = "/draw?background=" + id
    }

    return (
        <Box maxWidth="550px">
            <Carousel
                navButtonsAlwaysVisible
                animation="slide"
            >
                {
                    [{
                        id: 1,
                        name: "Background 1"
                    }, {
                        id: 2,
                        name: "Background 2"
                    }, {
                        id: 3,
                        name: "Background 3"
                    }, {
                        id: 4,
                        name: "Background 4"
                    }, {
                        id: 5,
                        name: "Background 5"
                    }, {
                        id: 6,
                        name: "Background 6"
                    }, {
                        id: 7,
                        name: "Background 7"
                    }, {
                        id: 8,
                        name: "Background 8"
                    }].map((background) => (
                        <Box align="center">
                            <Typography>{background.name}</Typography>
                            <Box style={{
                                width: canvasWidth,
                                background: "white"
                            }}>
                                <img width={`${canvasWidth}px`} height="400px" src={getBackgroundUrlFromId(background.id)}></img>
                            </Box>
                            <Button color="primary" variant="contained" onClick={() => handleChooseBackground(background.id)}>Use {background.name}</Button>
                        </Box>
                    ))
                }
            </Carousel>
        </Box>
    )
}
