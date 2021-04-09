import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";

import Header from "./Header";
import Footer from "./Footer";
import SideBar from "./SideBar";
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
          <SideBar />
          <Footer />
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
          <Route exact path="">
            <Offers />
          </Route>
          <Route>
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
  display: grid;
  grid-template-rows: 50px calc(100vh - 110px) 60px;
  grid-template-areas:
    "header header header"
    "sidebar page page"
    "footer footer footer";
`;

export default App;
