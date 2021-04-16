import React, { useEffect, useState } from "react";
import styled from "styled-components";
import imgItem from "./assets/1.jpg";
import { useParams, Link } from "react-router-dom";
import { firebaseApp } from "./AppContext";

const ItemDetails = () => {
  const { itemId } = useParams();
  const [currentItem, setCurrentItem] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  useEffect(() => {
    console.log(itemId);
    fetch(`/items/${itemId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setCurrentItem(data.data);
      });
  }, [itemId]);

  useEffect(() => {
    if (currentItem)
      fetch(`/users/${currentItem.user}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          setCurrentUser(data.data);
        });
  }, [currentItem]);

  currentItem &&
    firebaseApp
      .storage()
      .ref(currentItem.images[0].fileName)
      .getDownloadURL()
      .then((result) => setImgUrl(result));

  return (
    currentItem && (
      <Wrapper>
        <WrapperItem>
          <ImgWrapper>{imgUrl && <ItemImg src={imgUrl} />}</ImgWrapper>
          <div className="name">{currentItem.name}</div>
          <div className="location"> {currentItem.location}</div>
          <div className="description">{currentItem.description}</div>
          <div className="category">{currentItem.category}</div>
        </WrapperItem>
        {currentUser && (
          <WrapperUserInfo>
            <Link to={`/profile/${currentUser.id}`}>
              <StyledAvatar src={currentUser.photoURL} />
            </Link>
            <div>
              <div>{currentUser.displayName}</div>
              <div className="date"> Member since {currentUser.registered}</div>
              <div> Has made {currentUser.numOfSwaps} swaps</div>
            </div>
          </WrapperUserInfo>
        )}
      </Wrapper>
    )
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  justify-content: space-around;
`;

const WrapperItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  background-color: white;
  border-radius: 20px;
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
const WrapperUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;

  border-radius: 20px;
  height: 200px;
  background-color: white;
  font-size: 14pt;
  align-items: center;
  .date {
    opacity: 60%;
    font-size: 12pt;
  }
  padding: 10px;
  div {
    margin: 5px;
  }
`;

const ItemImg = styled.img`
  max-width: 500px;
  min-height: 200px;
`;

const ImgWrapper = styled.div`
  margin: auto;
  margin-top: 20px;
`;
const StyledAvatar = styled.img`
  border-radius: 50%;
  height: 100px;
  width: 100px;
`;

export default ItemDetails;
