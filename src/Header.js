import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink, Link, useHistory } from "react-router-dom";

import { AppContext } from "./AppContext";
import Avatar from "./Avatar";
import { AiOutlineInteraction } from "react-icons/ai";

const Header = () => {
  const { appUser, signInWithGoogle, handleSignOut, message } = useContext(
    AppContext
  );
  const history = useHistory();
  return (
    <Wrapper>
      <Logo to="/home">
        SWAP <AiOutlineInteraction />{" "}
      </Logo>
      <StyledHeader>
        {appUser && appUser.email ? (
          <>
            <StyledUserContainer>
              <Avatar src={appUser.photoURL} />
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
  font-size: 40pt;
  display: flex;
  align-items: center;
  background-color: #8fbc8f;
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
`;

export default Header;
