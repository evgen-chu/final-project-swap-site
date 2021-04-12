import React from "react";
import styled from "styled-components";
import CategoriesGrid from "./CategoriesGrid";
import banner from "./assets/banner.jpg";

const LandingPage = () => {
  return (
    <Wrapper>
      <Banner>
        <img src={banner} />
      </Banner>
      <Search>
        <Input type="text" placeholder="What are you looking for?" />
        <button>Search</button>
      </Search>

      <Divider />
      <CategoriesGrid />
      <button>MORE CATEGORIES</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Banner = styled.div`
  width: 100%;
  height: 400px;
  img {
    width: 100%;
    height: 400px;
    opacity: 60%;
  }
`;
const Divider = styled.div`
  height: 1px;
  background-color: black;
`;
const Search = styled.div`
  display: flex;
  position: absolute;
  left: 35%;
  top: 20%;
  button {
    border-radius: 5px;
    margin-left: 10px;
    width: 100px;
  }
`;
const Input = styled.input`
  width: 400px;
  height: 40px;
  border-radius: 5px;
`;
export default LandingPage;
