import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AppContext } from "./AppContext";
import Avatar from "./Avatar";
import Search from "./Search";
import plant4 from "./assets/topplant-3.svg";

const Header = () => {
  const [searchItem, setSearchItem] = useState("");

  const { appUser, newOffers, signInWithGoogle, handleSignOut } = useContext(
    AppContext
  );

  const history = useHistory();
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && (
        <Wrapper>
          <Logo to="/home">
            PlantSwap
            <ImgIcon src={plant4} />
          </Logo>
          {location.pathname !== "/" && location.pathname !== "/home" && (
            <Search searchItem={searchItem} setSearchItem={setSearchItem} />
          )}

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
                </StyledUserContainer>
                <Button onClick={handleSignOut}>Sign Out</Button>{" "}
              </>
            ) : (
              <Button onClick={signInWithGoogle}>Sign In</Button>
            )}
          </StyledHeader>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  background-color: #ffd800;
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ImgIcon = styled.img`
  height: 100px;
  width: 100px;
`;
const Logo = styled(Link)`
  text-decoration: none;
  margin-left: 30px;
  color: #414042;
  font-family: "RocknRoll One", sans-serif;
  font-size: 30pt;
  display: flex;
  align-items: center;
  background-color: #ffd800;
  z-index: 2;
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fca44e;
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
  background-color: #ffd800;
`;

export default Header;
