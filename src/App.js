import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";

import Header from "./Header";
import Footer from "./Footer";
import HomePage from "./HomePage/HomePage";
import LandingPage from "./LandingPage";
import ItemDetails from "./ItemDetails/ItemDetails";
import Profile from "./Profile/Profile";
import Offers from "./Offers";

function App() {
  return (
    <>
      <GlobalStyles />

      <Router>
        <Header />

        <div>
          <Switch>
            <Route exact path="/profile/:userId">
              <Profile />
            </Route>
            <Route exact path="/home">
              <HomePage />
            </Route>
            <Route exact path="/">
              <LandingPage />
            </Route>

            <Route exact path="/items/:itemId">
              <ItemDetails />
            </Route>
            <Route exact path="/offers">
              <Offers />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
