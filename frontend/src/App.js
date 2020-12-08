import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Box } from "@material-ui/core"
import Home from "./components/Home"
import Draw from "./components/Draw/Draw"
import View from "./components/View/View"
import NavBar from "./components/NavBar"

function Demo() {
    return (
        <Router>
            <NavBar />
            <Box p={2}>
                <Switch>
                    <Route path="/draw">
                        <Draw />
                    </Route>
                    <Route path="/view">
                        <View />
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