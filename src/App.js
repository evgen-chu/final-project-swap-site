import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";

import Header from "./Header";
import Footer from "./Footer";
import LandingPage from "./LandingPage";
import BrowsePage from "./BrowsePage";
import ItemDetails from "./ItemDetails";
import Profile from "./Profile";
import Offers from "./Offers";
import LoginPage from "./LoginPage";

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Wrapper>
          <Header />
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route>
            <BrowsePage exact path="/items" />
          </Route>
          <Route>
            <ItemDetails exact path="/items/:itemId" />
          </Route>
          <Route exact path="/profile/:userId">
            <Profile />
          </Route>
          <Route exact path="/offers">
            <Offers />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
        </Wrapper>
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
