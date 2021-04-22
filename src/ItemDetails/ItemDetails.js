import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import imgItem from "../assets/1.jpg";
import { useParams, Link } from "react-router-dom";
import { firebaseApp } from "../AppContext";
import OfferModal from "./OfferModal";
import Map from "../Map";
import MessageModal from "./MessageModal";
import frame from "../assets/section4.gif";
import backg from "../assets/section14.png";
import top from "../assets/section7top.png";
import backg2 from "../assets/section14r.png";
import bottom from "../assets/section6topr.png";
import moreplants from "../assets/moreplants.png";
import { AppContext } from "../AppContext";

const ItemDetails = () => {
  const { appUser } = useContext(AppContext);
  const { itemId } = useParams();
  const [currentItem, setCurrentItem] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
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
        <SectionTop>
          <img src={top} />
        </SectionTop>
        {currentUser && (
          <WrapperUserInfo>
            <Link to={`/profile/${currentUser.id}`}>
              <StyledAvatar src={currentUser.photoURL} />
            </Link>
            <InfoWrapper>
              <div>{currentUser.displayName}</div>
              <div className="date"> Member since {currentUser.registered}</div>
              <div> Has made {currentUser.numOfSwaps} swaps</div>
              {!(appUser.id === currentUser.id) && (
                <ButtonWrapper>
                  <button
                    className="offer"
                    onClick={() => {
                      setIsOpen(true);
                    }}
                  >
                    Offer{" "}
                  </button>
                  <button
                    className="message"
                    onClick={() => {
                      setOpenMessage(true);
                    }}
                  >
                    {" "}
                    Message
                  </button>
                </ButtonWrapper>
              )}
            </InfoWrapper>
            <OfferModal
              open={isOpen}
              setIsOpen={setIsOpen}
              currentUser={currentUser}
              currentItem={currentItem}
            />
            <MessageModal
              open={openMessage}
              setIsOpen={setOpenMessage}
              currentUser={currentUser}
              currentItem={currentItem}
            />
          </WrapperUserInfo>
        )}
        <WrapperItem>
          <ItemInfo>
            <ImgWrapper>{imgUrl && <ItemImg src={imgUrl} />}</ImgWrapper>
            <div>
              <div className="name">{currentItem.name}</div>
              <div className="location"> Montreal, {currentItem.district}</div>
              <div className="description">{currentItem.description}</div>
              <div className="category">Care level: {currentItem.category}</div>
            </div>
          </ItemInfo>

          <Map
            itemLat={Number(currentItem.location_lat)}
            itemLng={Number(currentItem.location_lng)}
          />
        </WrapperItem>
        <SectionBottom>
          <img src={bottom} />
        </SectionBottom>

        <ImgPlants src={moreplants} />
      </Wrapper>
    )
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  // background-image: url(${backg});
  background-color: #fca44e;
  height: 90vh;
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;
const ItemInfo = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
  .category {
    margin-top: 20px;
    opacity: 80%;
  }
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
const SectionTop = styled.div`
  width: 100%;
  height: 150px;
  justify-content: flex-start;
  background-color: #ffd800;
  img {
    width: 100%;
    height: 150px;
  }
`;
const SectionBottom = styled.div`
  width: 100%;
  height: 220px;
  justify-content: flex-start;
  img {
    width: 100%;
    height: 220px;
  }
`;

const WrapperItem = styled.div`
  display: flex;
  margin-left: 40px;
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
  @media (max-width: 900px) {
  }
`;
const WrapperUserInfo = styled.div`
  position: fixed;
  margin-top: 5px;
  top: 17%;
  margin-right: 40px;
  right: 0;
  display: flex;
  flex-direction: column;
  width: 20%;

  border-radius: 20px;
  height: 250px;
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
  @media (max-width: 900px) {
    position: static;
    width: 40%;
  }
`;

const ItemImg = styled.img`
  max-width: 500px;
  max-height: 500px;
  border-radius: 20px;
`;

const ImgWrapper = styled.div`
  margin: auto;
  margin-top: 20px;
  margin-right: 20px;
`;

const StyledAvatar = styled.img`
  border-radius: 50%;
  height: 100px;
  width: 100px;
`;
const InfoWrapper = styled.div``;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    font-family: "Poppins", sans-serif;
    border-radius: 5px;
  }
  .offer {
    width: 60px;
  }
  .message {
    width: 90px;
  }
`;
const ImgPlants = styled.img`
  position: absolute;
  right: 20px;
  top: 50%;
  @media (max-width: 900px) {
    top: 35%;
    width: 40%;
    height: 40%;
  }
`;

export default ItemDetails;
