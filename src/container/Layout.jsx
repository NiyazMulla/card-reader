import React, { Component } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import routes from "../routes";
import { Route, Switch } from "react-router-dom";
class Layout extends Component {
  render() {
    return (
      <div className="layout-container">
        <Header />
        <div className="section-container">
          <div className="side-bar">
            <SideBar />
          </div>
          <div className="pages-render">
            <Switch>
              {routes.map((route, index) => {
                return (
                  <Route
                    key={index}
                    exact={route.exact}
                    path={route.path}
                    component={route.component}
                  />
                );
              })}
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
