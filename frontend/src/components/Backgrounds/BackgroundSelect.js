import React from 'react'
import { Typography, Box, Button } from "@material-ui/core"
import { getBackgroundUrlFromId } from "../../functions"
import Carousel from 'react-material-ui-carousel'

export default function BackgroundSelect() {

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
                    }].map((background) => (
                        <Box align="center">
                            <Typography>{background.name}</Typography>
                            <Box>
                                <img width="400px" height="400px" src={getBackgroundUrlFromId(background.id)}></img>
                            </Box>
                            <Button color="primary" variant="contained" onClick={() => handleChooseBackground(background.id)}>Use {background.name}</Button>
                        </Box>
                    ))
                }
            </Carousel>
        </Box>
    )
}
