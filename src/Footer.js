import React from "react";
import styled from "styled-components";
import { FaTwitter } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { AiOutlineFacebook } from "react-icons/ai";
import { AiOutlineCopyright } from "react-icons/ai";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/" && (
        <Wrapper>
          <h4>
            <AiOutlineCopyright /> 2021 Plant Swap
          </h4>
          <ConnectWrapper>
            Connect with us:
            <div className="instagram">
              <FaTwitter />
            </div>
            <div className="facebook">
              <GrInstagram />
            </div>
            <div className="twitter">
              <AiOutlineFacebook />
            </div>
          </ConnectWrapper>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  width: 100%;
  background-color: #ffd800;
  h4 {
    font-family: "RocknRoll One", sans-serif;
  }
`;
const ConnectWrapper = styled.div`
  display: flex;
  width: 250px;
  font-size: 12pt;
  justify-content: space-around;
`;

export default Footer;
