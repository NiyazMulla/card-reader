import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Layout from "./container/Layout";
import { LINK_CUSTOMER_SEARCH } from "./routes";

function App() {
  return (
    <div className="App">
      <Router>
        <React.Suspense fallback={"Loading..."}>
          <Switch>
            <Route
              path={LINK_CUSTOMER_SEARCH}
              render={(props) => <Layout {...props} />}
            />
          </Switch>
        </React.Suspense>
      </Router>
    </div>
  );
}

export default App;
