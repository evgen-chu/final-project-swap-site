import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { AppContext } from "./AppContext";
import Avatar from "./Avatar";

const Header = () => {
  const { appUser, signInWithGoogle, handleSignOut, message } = useContext(
    AppContext
  );
  const history = useHistory();
  return (
    <Wrapper>
      <Logo>SWAP </Logo>
      <StyledHeader>
        {appUser && appUser.email ? (
          <>
            <StyledUserContainer>
              <Avatar src={appUser.photoURL} />
              <p>
                {appUser.displayName}
                {/* ({appUser.email}) */}
              </p>
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
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-family: "Concert One", cursive;
  font-size: 40pt;
`;

const StyledHeader = styled.nav`
  display: flex;
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
  border-radius: 5px;
  margin-left: 10px;
`;

export default Header;
