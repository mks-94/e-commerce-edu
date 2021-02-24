import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../src/components/header/Header";
import Footer from "./components/footer/Footer";
import Auth from "./pages/Auth";
import Landing from "./pages/Landing";
import Product from "./pages/Product";
import "./styles/main.css";

const App = () => {
  return (
    <Fragment>
      <Router>
        <Header />
        <div className="page-container">
          <Switch>
            <Route exact path="/auth">
              <Auth />
            </Route>
            <Route exact path="/product">
              <Product />
            </Route>
            <Route exact path="/">
              <Landing />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </Fragment>
  );
};

export default App;
