import React from "react";
import "antd/dist/antd.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import BotGui from "./pages/BotGui";
import NodeRequired from "./pages/NodeRequired";
import { StoreContext } from "storeon/react";
import { store } from "./store";
import Update from "./pages/Update";
import "./App.css";

export default function App() {
  return (
    <StoreContext.Provider value={store}>
      <Router>
        <Switch>
          <Route path="/update">
            <Update />
          </Route>
          <Route path="/node-required">
            <NodeRequired />
          </Route>
          <Route path="/">
            <BotGui />
          </Route>
        </Switch>
      </Router>
    </StoreContext.Provider>
  );
}
