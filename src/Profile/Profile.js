import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import ImageGrid from "../ImageGrid";
import UploadModal from "./UploadModal";
import { useParams } from "react-router-dom";
import { IoFlowerOutline } from "react-icons/io5";
import { AppContext } from "../AppContext";
import { firebaseApp } from "../AppContext";
import SunFlower from "../SunFlower";
import backImg from "../assets/section11.png";
import topImg from "../assets/section6top.png";
import bottomImg from "../assets/section6topr.png";
import imgplant1 from "../assets/plant3.png";
import imgplant2 from "../assets/aloe.png";
import ProfilePageSelect from "./ProfilePageSelect";

const Profile = () => {
  const { appUser, newOffers } = useContext(AppContext);
  const { userId } = useParams();
  const [open, setOpen] = useState(false);
  const [userItems, setUserItems] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  //const [status, setStatus] = useState("loading");
  const [statusUser, setStatusUser] = useState("loading");
  const [deleteFlag, setDeleteFlag] = useState(true);
  const [itemAdded, setItemAdded] = useState(true);
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    fetch(`/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data.data);
        setStatusUser("idle");
      });
  }, [userId]);

  useEffect(() => {
    fetch(`/users/${userId}/items?page=${page}&limit=9`)
      .then((res) => res.json())
      .then((data) => {
        setUserItems(data.data);
      });
  }, [currentUser, deleteFlag, itemAdded, page]);

  console.log(userItems);
  return (
    <Wrapper>
      <ImgTop src={topImg} />
      {statusUser === "loading" ? (
        <Loader />
      ) : (
        <WrapperUserInfo>
          <div>
            <StyledAvatar src={currentUser.photoURL} />
          </div>
          <div>
            <div>{currentUser.displayName}</div>
            <div className="date"> Member since {currentUser.registered}</div>
            <div> Has made {currentUser.numOfSwaps} swaps</div>
          </div>
        </WrapperUserInfo>
      )}
      {appUser.id === userId && (
        <button
          onClick={(e) => {
            setOpen(true);
          }}
        >
          Add item
        </button>
      )}
      <UploadModal
        isOpen={open}
        setOpen={setOpen}
        itemAdded={itemAdded}
        setItemAdded={setItemAdded}
      />
      <GridWrapper>
        <ImageGrid
          deleteFlag={deleteFlag}
          setDeleteFlag={setDeleteFlag}
          items={userItems}
          currentUser={currentUser}
        />
      </GridWrapper>
      <ProfilePageSelect userId={userId} page={page} setPage={setPage} />
      <Section>
        <img src={bottomImg} />
      </Section>
      <ImgPlant1 src={imgplant1} />
      <ImgPlant2 src={imgplant2} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  position: relative;
  background-color: #319365;
  //height: 82vh;
  //background-color: #62c785;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
   // position: absolute;
  //  top: 10%;
    border: 2px solid 
    margin-top: 20px;
    border: none;
    border-radius: 5px;
  }
`;

const StyledAvatar = styled.img`
  border-radius: 50%;
  height: 100px;
  width: 100px;
`;

const WrapperUserInfo = styled.div`
  position: absolute;
  top: 10%;
  display: flex;
  width: 40%;
  self-align: center;
  border-radius: 20px;
  height: 100px;
  background-color: white;
  font-size: 14pt;
  justify-content: space-around;
  .date {
    opacity: 60%;
    font-size: 12pt;
  }
  padding: 10px;
  div {
    margin: 5px;
  }
`;
const Section = styled.div`
  width: 100%;
  // background-image: url(${bottomImg});
  background-color: #62c785;
  height: 150px;
  img {
    width: 100%;
    height: 150px;
  }
`;

const GridWrapper = styled.div`
  //position: absolute;
  //top: 50%;
  width: 100%;
  background-image: url(${backImg});
  background-color: white;
`;

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;
const Loader = styled(IoFlowerOutline)`
  animation: ${rotation} 2s infinite linear;
  .rotate {
    animation: ${rotation} 2s infinite linear;
  }
`;
const ImgTop = styled.img`
  width: 100%;
`;
const ImgPlant1 = styled.img`
  position: absolute;
  width: 200px;
  height: 300px;
  right: 0;
  top: -42px; ;
`;
const ImgPlant2 = styled.img`
  position: absolute;
  left: 10px;
  top: 80%;
  width: 250px;
  height: 250px;
  @media (max-width: 900px) {
    top: 92%;
  }
`;
export default Profile;
