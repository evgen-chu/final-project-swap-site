import React from "react";
import styled, { keyframes } from "styled-components";
import plant1 from "./assets/topplant-1.svg";
import plant2 from "./assets/topplant-2.svg";
import plant3 from "./assets/topplant-3.svg";
import plant4 from "./assets/topplant-4.svg";
import plant5 from "./assets/topplant-5.svg";
import { useHistory } from "react-router-dom";

const LandingPage = () => {
  const history = useHistory();
  return (
    <Wrapper>
      <PlantsWrapper>
        <AnimatedImg className="plant-1">
          <img alt="" src={plant1} />
        </AnimatedImg>
        <AnimatedImg className="plant-2">
          <img alt="" src={plant2} />
        </AnimatedImg>
        <AnimatedImg className="plant-3">
          <img alt="" src={plant3} />
        </AnimatedImg>
      </PlantsWrapper>
      <ButtonWrapper>
        <div>
          {" "}
          Welcome to <span>Plant Swap</span>!
        </div>
        <button
          onClick={(e) => {
            history.push("/home");
          }}
        >
          Let's start
        </button>
      </ButtonWrapper>

      <PlantsWrapper>
        <AnimatedImg className="plant-4">
          <img alt="" src={plant4} />
        </AnimatedImg>
        <AnimatedImg className="plant-5">
          <img alt="" src={plant5} />
        </AnimatedImg>
      </PlantsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  background-color: var(--yellow-color);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  //color: #414042;
  .plant-1 {
    margin-top: 200px;
  }
  .plant-2 {
    margin-top: 100px;
  }
  .plant-3 {
    margin-top: 200px;
  }
  .plant-4 {
    margin-bottom: 200px;
  }
  .plant-5 {
    margin-bottom: 200px;
  }
  span {
    font-family: var(--heading-font-family);
  }
`;
const ButtonWrapper = styled.div`
  margin: auto;
  font-size: 40pt;
  font-family: var(--general-font-family);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 600;
  button {
    background-color: var(--yellow-color);
    border: 6px #6c757d solid;
    border-radius: 5px;
    margin-top: 60px;
    width: 150px;
    height: 50px;
    font-family: var(--heading-font-family);
    font-size: 18pt;
    display: flex;
    align-items: center;
  }
`;
const PlantsWrapper = styled.div`
  height: 40%;
  display: flex;
  justify-content: space-around;
`;

const fullRotate = keyframes`
0% {
    transform: rotate3d(0, 0, 0, 0deg);
}
25% {transform: rotate3d(0, 0, 1, 90deg);
}
50% {transform: rotate3d(0, 0, 1,180deg);
}
75% {
    transform: rotate3d(0, 0, 0,270deg);
}
100% {
    transform: rotate3d(0, 0, 0, 359deg);
}

`;

const AnimatedImg = styled.div`
  animation: ${fullRotate} 2s infinite linear;
  transform-origin: center;
  will-change: transform;
  width: 300px;
  height: 300px;
  animation-duration: 80s;
`;

export default LandingPage;
