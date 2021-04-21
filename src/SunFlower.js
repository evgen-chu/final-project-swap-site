import React from "react";
import styled, { keyframes } from "styled-components";

const SunFlower = () => {
  return (
    <Wrapper id="position" className="sunflower">
      <div className="head">
        <div id="eye-1" className="eye"></div>
        <div id="eye-2" className="eye"></div>
        <div className="mouth"></div>
      </div>
      <div className="petals"></div>
      <div className="trunk">
        <div className="left-branch"></div>
        <div className="right-branch"></div>
      </div>
      <div className="vase"></div>
    </Wrapper>
  );
};

const petals = keyframes`
    0% {
      transform: rotate(0);
      left: 10px;
    }
    25% {
      left: 20px;
    }
    50% {
      left: 10px;
    }
    75% {
      left: 20px;
    }
    100% {
      transform: rotate(360deg);
      left: 10px;
    }`;
const hmove = keyframes`
    0% {
      left: 5px;
    }
    25% {
      left: 15px;
    }
    50% {
      left: 5px;
    }
    75% {
      left: 15px;
    }
    100% {
      left: 5px;
    }
  `;
const eye = keyframes`
    from {
    }
    79% {
      height: 5px;
    }
    80% {
      height: 0px;
    }
    85% {
      height: 5px;
    }
    to {
      height: 5px;
    }
  `;
const trunk = keyframes`
    0% {
      left: 34px;
      transform: rotate(-5deg);
    }
    25% {
      left: 40px;
      transform: rotate(5deg);
    }
    50% {
      left: 34px;
      transform: rotate(-5deg);
    }
    75% {
      left: 40px;
      transform: rotate(5deg);
    }
    100% {
      left: 34px;
      transform: rotate(-5deg);
    }`;
const Wrapper = styled.div`
  position: fixed;
  bottom: 180px;
  left: 25px;

  .sunflower {
    position: relative;
    height: 30px;
    width: 30px;
  }
  .head {
    animation: ${hmove} 2s infinite linear;
    height: 50px;
    width: 62px;
    position: relative;
    left: 8px;
    top: 39px;
    transform-origin: 50% -7px;
    user-select: none;
  }
  .head .eye {
    background: #43699a;
    border-radius: 10px;
    height: 5px;
    position: absolute;
    top: 30px;
    width: 5px;
  }
  .head .eye#eye-1 {
    left: 17px;
    animation: ${eye} 4s linear infinite normal 0.5s;
  }
  .head .eye#eye-2 {
    right: 17px;
    animation: ${eye} 4s linear infinite normal 0.5s;
  }
  .head .mouth {
    background: #ecf0f1;
    border-radius: 30px;
    bottom: 2px;
    clip: rect(8px, 15px, 16px, 0);
    height: 16px;
    margin-left: -7.5px;
    position: absolute;
    left: 50%;
    width: 15px;
  }

  .petals {
    z-index: -1;
    border-radius: 100%;
    display: inline-block;
    background-color: #faaa18;
    height: 50px;
    width: 50px;
    position: absolute;
    animation: ${petals} 2s infinite linear;
    box-shadow: 15px 17px #ffe000, -15px 17px #ffe000, -22px -7px #ffe000,
      0px -22px #ffe000, 22px -7px #ffe000;
  }
  .trunk {
    height: 65px;
    width: 5px;
    background: #77b039;
    left: 37px;
    top: 100px;
    position: absolute;
    z-index: -2;
    animation: ${trunk} 2s infinite linear;
  }
  .left-branch {
    background: #77b039;
    height: 35px;
    width: 9px;
    position: absolute;
    left: -12px;
    top: 24px;
    border-radius: 100% 0% 0% 0%;

    transform: rotate(-50deg);
  }

  .right-branch {
    background: #77b039;
    height: 35px;
    width: 9px;
    position: absolute;
    top: 24px;
    left: 10px;
    border-radius: 0% 100% 0% 0%;

    transform: rotate(50deg);
  }
  .vase {
    position: absolute;
    top: 165px;
    left: 13px;
    height: 0;
    width: 38px;
    border-top: 45px solid #faaa18;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
  }
  .vase:before,
  .vase:after {
    content: "";
    position: absolute;
    background: #faa118;
  }
  .vase:before {
    background: #f9a018;
    width: 58px;
    height: 20px;
    top: -50px;
    left: -10px;
    position: absolute;
    box-shadow: 0 5px 10px -9px black;
  }
`;

//   body {
//     background: #ffffff;
//     text-align: center;
//   }

export default SunFlower;
