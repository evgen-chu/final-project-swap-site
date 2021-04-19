import React, { useState, useContext, useEffect } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import { AppContext } from "./AppContext";

const OfferModal = ({ open, setIsOpen, currentUser, currentItem }) => {
  const { appUser, appUserItems } = useContext(AppContext);
  console.log(appUser);
  console.log("items:", appUserItems);
  const [offer, setOffer] = useState(null);
  const [message, setMessage] = useState(null);

  console.log("currentUser", currentUser, "currentItem", currentItem);

  const handleSubmitOffer = () => {
    const formData = new FormData();
    console.log("appUSer ID:", appUser.id);
    formData.append("userBidder", appUser.id);
    console.log("userOfferee ID:", currentUser.id);
    formData.append("userOfferee", currentUser.id);
    console.log("itemBidderId ID:", offer);
    formData.append("itemBidderId", offer);
    console.log("itemOffereeId ID:", currentItem.id);
    formData.append("itemOffereeId", currentItem.id);
    formData.append("message", message);
    console.log(formData);
    fetch("/offers/addOffer", {
      method: "POST",
      // headers: { "Content-Type": "multipart/form-data" },
      body: formData,
    }).then((data) => console.log(data));
    setIsOpen(false);
  };
  return (
    <Modal isOpen={open}>
      <Form>
        <select
          placeholder="Choose item to offer"
          onChange={(e) => {
            console.log(e.target.value);
            setOffer(e.target.value);
          }}
        >
          <option>Select item to offer</option>
          {appUserItems.map((item) => {
            return <option value={item.id}>{item.name}</option>;
          })}
        </select>
        <textarea
          placeholder="You can add a message"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <ButtonWrapper>
          <button onClick={handleSubmitOffer}>Send Offer</button>
          <button
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Cancel
          </button>
        </ButtonWrapper>
      </Form>
    </Modal>
  );
};

const Modal = styled(ReactModal)`
  background-color: #f0f8ff;
  position: absolute;
  width: 50%;
  height: 20%;
  outline: none;
  background: #fff;
  margin: auto;
  top: 30%;
  left: 30%;
  border-radius: 20px;
`;
const Form = styled.form`
  background-color: #f0f8ff;
  height: 100%;
  width: 100%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    width: 50%;
    height: 20px;
    margin: 10px;
  }
  textarea {
    width: 50%;
    margin: 10px;
  }
  select {
    width: 50%;
    margin: 10px;
  }
  button {
    width: 20%;
    border-radius: 5px;
  }
`;

const ButtonWrapper = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-around;
`;

export default OfferModal;
