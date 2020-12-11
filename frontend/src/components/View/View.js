import React, { useEffect, useState } from 'react'
import { Box, Button } from "@material-ui/core"
import { getDrawings } from "../../functions"
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import { useHistory } from "react-router-dom"
import Canvas from "./Canvas"
import Plauque from "./Plauque"
import Rating from "./Rating"

const darkTheme = createMuiTheme({
    palette: {
        background: {
            default: "#141414",
        },
        type: "dark",
    },
    shadows: ["none"],
});

export default function View() {
    const history = useHistory()

    const [drawings, setDrawings] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        (async () => {

            const newDrawings = await getDrawings(page)

            setDrawings(drawings => drawings.concat(newDrawings.data))

            document.querySelectorAll("canvas").forEach(node => {
                node.style.zIndex = 14
            })
        })()
    }, [page])

    const handleSeeMore = () => {
        setPage(page => page + 1)
    }

    function handleDrawSomething() {
        history.push("/backgrounds")
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />

            <Box align="center" mb={6} pt={4}>
                <Button variant='contained' color="primary" onClick={handleDrawSomething}>Draw Something</Button>
            </Box>

            {drawings.map(img => (
                <Box mb={8} align="center">
                    <Canvas img={img} />
                    <Plauque img={img} />
                    <Rating img={img} />
                </Box>
            ))}

            <Box align="center" mb={6} pt={4}>
                <Button variant='contained' color="primary" onClick={handleSeeMore}>See More</Button>
            </Box>

        </ThemeProvider>
    )
}
