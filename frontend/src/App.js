import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../src/components/header/Header";
import Footer from "./components/footer/Footer";
import Auth from "./pages/Auth";
import Landing from "./pages/Landing";
import Product from "./pages/Product";
import ShoppingCart from "./pages/ShoppingCart";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./styles/main.css";
import Alert from "./components/alert/Alert";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const App = () => {
  const stripePromise = loadStripe(
    "pk_test_51IS2P9KgFOvyDQfDFFIGFRaFbo32kY3BHCOiZEXjuhRuXMlLAKB0h7boWF0CKf5RShRoPFPJ8bi8tAMmiTD3Fr3b00C7iiQQO5"
  );

  return (
    <Provider store={store}>
      <Router>
        <Header />
        <div className="page-container">
          <Alert />
          <Elements stripe={stripePromise}>
            <Switch>
              <Route exact path="/auth">
                <Auth />
              </Route>
              <Route exact path="/product">
                <Product />
              </Route>
              <Route exact path="/cart">
                <ShoppingCart />
              </Route>
              <Route exact path="/">
                <Landing />
              </Route>
            </Switch>
          </Elements>
        </div>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
