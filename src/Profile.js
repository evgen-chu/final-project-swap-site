import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import ImageGrid from "./ImageGrid";
import UploadModal from "./UploadModal";
import { useParams } from "react-router-dom";
import { IoFlowerOutline } from "react-icons/io5";
import { AppContext } from "./AppContext";
import { firebaseApp } from "./AppContext";
import SunFlower from "./SunFlower";

const Profile = () => {
  const { appUser, newOffers } = useContext(AppContext);
  const { userId } = useParams();
  const [open, setOpen] = useState(false);
  const [userItems, setUserItems] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [status, setStatus] = useState("loading");
  const [statusUser, setStatusUser] = useState("loading");
  const [deleteFlag, setDeleteFlag] = useState(true);
  const [itemAdded, setItemAdded] = useState(true);

  const [imgUrls, setImgUrls] = useState([]);

  useEffect(() => {
    fetch(`/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data.data);
        setStatusUser("idle");
      });
  }, [userId]);

  useEffect(() => {
    fetch(`/users/${userId}/items`)
      .then((res) => res.json())
      .then((data) => {
        setUserItems(data.data);
      });
  }, [currentUser, deleteFlag, itemAdded]);

  const setItems = async () => {
    if (userItems) {
      console.log(userItems);
      const tempUrls = [];

      let promises = userItems.map((item) => {
        return firebaseApp
          .storage()
          .ref(item.images[0].fileName)
          .getDownloadURL();
      });
      await Promise.all(promises).then((results) => {
        results.forEach((result, index) => {
          const item = userItems[index];
          tempUrls.push({
            id: item.id,
            url: result,
            name: item.name,
            category: item.category,
          });
        });
      });
      return tempUrls;
    }
    return [];
  };
  useEffect(async () => {
    let tempUrls = await setItems();
    console.log(tempUrls);
    setImgUrls(tempUrls);
    setStatus("idle");
  }, [userItems]);
  return (
    <Wrapper>
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
        {status === "loading" ? (
          <Loader />
        ) : (
          <ImageGrid
            deleteFlag={deleteFlag}
            setDeleteFlag={setDeleteFlag}
            items={imgUrls}
            currentUser={currentUser}
          />
        )}
        {/* {imgUrls.length === userItems.length ? (
          <ImageGrid items={imgUrls} />
        ) : (
          <div>loading</div>
        )} */}
      </GridWrapper>

      <SunFlower />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
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

const GridWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
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

export default Profile;
