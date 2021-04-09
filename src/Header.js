import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();
  return (
    <Wrapper>
      <Logo>SWAP </Logo>
      <Button
        onClick={() => {
          history.push("/login");
        }}
      >
        Log In / Sign Up
      </Button>
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

const Button = styled.button`
  font-size: 14pt;
  width: 200px;
  height: 30px;
  border: none;
`;

export default Header;
