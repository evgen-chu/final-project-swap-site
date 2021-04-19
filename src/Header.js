import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, Link, useHistory } from "react-router-dom";

import { AppContext } from "./AppContext";
import Avatar from "./Avatar";
import { AiOutlineInteraction } from "react-icons/ai";
import flower from "./assets/flower.svg";
import { GiFlowerPot } from "react-icons/gi";
const Header = () => {
  const {
    appUser,
    newOffers,
    signInWithGoogle,
    handleSignOut,
    message,
  } = useContext(AppContext);

  const history = useHistory();

  console.log(newOffers);
  return (
    <Wrapper>
      <Logo to="/home">
        PlantSWAP <FlowerIcon />{" "}
      </Logo>
      <StyledHeader>
        {appUser && appUser.email ? (
          <>
            <StyledUserContainer>
              {newOffers.length > 0 && (
                <OfferNumber
                  onClick={() => {
                    history.push("/offers");
                  }}
                >
                  {newOffers.length}
                </OfferNumber>
              )}
              <AvatarWrapper to={`/profile/${appUser.id}`}>
                <Avatar src={appUser.photoURL} />
              </AvatarWrapper>
              {/* <p>
                {appUser.displayName}
               ({appUser.email}) 
              </p> */}
            </StyledUserContainer>
            <Button onClick={handleSignOut}>Sign Out</Button>{" "}
          </>
        ) : (
          <Button onClick={signInWithGoogle}>Sign In</Button>
        )}
      </StyledHeader>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #8fbc8f;
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Logo = styled(Link)`
  text-decoration: none;
  color: black;
  font-family: "Concert One", cursive;
  font-size: 30pt;
  display: flex;
  align-items: center;
  background-color: #8fbc8f;
`;
const FlowerIcon = styled(GiFlowerPot)`
  margin-left: 20px;
  width: 40px;
  heigth: 40px;
`;

const StyledHeader = styled.nav`
  display: flex;
  align-items: center;
  background: #f0e7d5
  padding: 6px 14px;
  min-height: 48px;
`;

const StyledUserContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;

const Button = styled.button`
  height: 30px;
  border-radius: 5px;
  margin-left: 10px;
  margin-right: 10px;
`;

const OfferNumber = styled.button`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #f08080;
  color: white;
  font-size: 16pt;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  box-shadow: 2px 6px 24px -3px rgba(0, 0, 0, 0.53);
`;
const AvatarWrapper = styled(Link)`
  background-color: #8fbc8f;
`;

export default Header;
