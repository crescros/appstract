import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Box } from "@material-ui/core"
import Home from "./components/Home"
import Draw from "./components/Draw/Draw"
import View from "./components/View/View"
import Backgrounds from "./components/Backgrounds/Backgrounds"

function Demo() {
    return (
        <Box sytle={{width: "100vw",
        height: '100vh',
            overflowX: "hidden"
        }}>
            <Router>
                <Switch>
                    <Route path="/draw">
                        <Draw />
                    </Route>
                    <Route path="/view">
                        <View />
                    </Route>
                    <Route path="/backgrounds">
                        <Backgrounds />
                    </Route>
                    <Route exact path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </Box>
    );
}

export default Demo