import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ImageGrid from "./ImageGrid";
import UploadForm from "./UploadForm";
import UploadModal from "./UploadModal";
import { useParams } from "react-router-dom";

import { firebaseApp } from "./AppContext";

const Profile = () => {
  const { userId } = useParams();
  const [open, setOpen] = useState(false);
  const [userItems, setUserItems] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  const [imgUrls, setImgUrls] = useState([]);

  useEffect(() => {
    console.log("useEffect 1");
    fetch(`/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data.data);
        //setUserItems([]);
        //setImgUrls([]);
      });
  }, [userId]);

  useEffect(() => {
    console.log("useEffect 2");
    fetch(`/users/${userId}/items`)
      .then((res) => res.json())
      .then((data) => {
        //setImgUrls([]);
        setUserItems(data.data);
      });
  }, [currentUser]);

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

        // let temp = imgUrls;
        // temp.push({ id: item.id, url: result });
        // setImgUrls(temp);
        // setImgUrls([...imgUrls, { id: item.id, url: result }]);
      });
      return tempUrls;
    }
    return [];
  };
  useEffect(async () => {
    console.log("useEffect 3");
    let tempUrls = await setItems();
    console.log(tempUrls);
    setImgUrls(tempUrls);
  }, [userItems]);
  console.log(imgUrls);
  return (
    <Wrapper>
      {currentUser && (
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
      <button
        onClick={(e) => {
          setOpen(true);
        }}
      >
        Add item
      </button>
      <UploadModal isOpen={open} setOpen={setOpen} />
      <GridWrapper>
        <ImageGrid items={imgUrls} />
        {/* {imgUrls.length === userItems.length ? (
          <ImageGrid items={imgUrls} />
        ) : (
          <div>loading</div>
        )} */}
      </GridWrapper>
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
  width: 100%;
  background-color: white;
`;

export default Profile;
