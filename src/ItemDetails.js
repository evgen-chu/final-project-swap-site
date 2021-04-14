import React, { useEffect, useState } from "react";
import styled from "styled-components";
import imgItem from "./assets/1.jpg";
import { useParams } from "react-router-dom";

const ItemDetails = () => {
  const { itemId } = useParams();
  const [currentItem, setCurrentItem] = useState(null);
  useEffect(() => {
    console.log(itemId);
    fetch(`/items/${itemId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCurrentItem(data);
      });
  }, [itemId]);
  // const currentItem = {
  //   _id: "01",
  //   host_id: "1",
  //   name: "Scrabble",
  //   category: "Games",
  //   location: "Montreal, Old Port",
  //   description:
  //     "Put letters together, build words, add up your points and win! This classic game features the classic Scrabble equipment for a big-time word-on-word showdown. Do you see a word your opponent hasn't seen? A double or triple letter or word space that will let you earn big points? Could the luck of the draw win you the game? Use your letters to score points and challenge your family and friends. It’s your word against theirs!",
  //   imageUrl: imgItem,
  // };
  return (
    currentItem && (
      <Wrapper>
        <WrapperItem>
          <ImgWrapper>
            <ItemImg src={currentItem.imageUrl} />
          </ImgWrapper>
          <div className="name">{currentItem.name}</div>
          <div className="location"> {currentItem.location}</div>
          <div className="description">{currentItem.description}</div>
          <div className="category">{currentItem.category}</div>
        </WrapperItem>
        <WrapperUser>
          <img src="" />
          <div>slogan</div>
          <div>registered since </div>
          <div>changed num of items</div>
        </WrapperUser>
      </Wrapper>
    )
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const WrapperItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  .name {
    font-size: 20pt;
    margin-top: 20px;
  }
  .location {
    font-size: 12pt;
    opacity: 70%;
    margin-top: 10px;
  }
  .description {
    font-size: 14pt;
    margin-top: 20px;
  }
`;
const WrapperUser = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemImg = styled.img`
  max-width: 500px;
  min-height: 200px;
`;

const ImgWrapper = styled.div`
  margin: auto;
  margin-top: 20px;
`;

export default ItemDetails;
