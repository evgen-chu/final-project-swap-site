import React from "react";
import styled from "styled-components";

const categories = [
  "Sport",
  "Pets",
  "Clothes",
  "Computers",
  "Music",
  "Games",
  "Toys",
  "Health",
  "Garden",
];
const CategoriesGrid = () => {
  return (
    <Wrapper>
      {categories.map((item, index) => {
        return <Button key={item + "button" + index}>{item}</Button>;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 60%;
  display: flex;
  margin: auto;
  flex-wrap: wrap;
`;
const Button = styled.button`
  height: 200px;
  width: 200px;
  margin: 20px;
  border-radius: 5px;
`;

export default CategoriesGrid;
