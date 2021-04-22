import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";

import Header from "./Header";
import Footer from "./Footer";
import LandingPage from "./HomePage/LandingPage";
import LandingPageNew from "./LandingPageNew";
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
              <LandingPage />
            </Route>
            <Route exact path="/">
              <LandingPageNew />
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

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export default App;
