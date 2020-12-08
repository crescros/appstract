import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Box } from "@material-ui/core"
import Home from "./components/Home"
import Draw from "./components/Draw/Draw"
import View from "./components/View/View"
import Backgrounds from "./components/Backgrounds/Backgrounds"

function Demo() {
    return (
        <Router>
            <Box p={2}>
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
            </Box>
        </Router>
    );
}

export default Demo