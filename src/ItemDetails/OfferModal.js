import React, { useState, useContext, useEffect } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import { AppContext } from "../AppContext";
import back from "../assets/section9.png";

const OfferModal = ({ open, setIsOpen, currentUser, currentItem }) => {
  const { appUser } = useContext(AppContext);
  const [offer, setOffer] = useState(null);
  const [message, setMessage] = useState(null);
  const [userItems, setUserItems] = useState([]);

  useEffect(() => {
    fetch(`/users/${appUser.id}/items`)
      .then((res) => res.json())
      .then((data) => {
        setUserItems(data.data);
      });
  }, [appUser.id]);

  const handleSubmitOffer = () => {
    const formData = new FormData();
    formData.append("userBidder", appUser.id);
    formData.append("userOfferee", currentUser.id);
    formData.append("offereeEmail", currentUser.email);
    formData.append("itemBidderId", offer.id);
    formData.append("itemOffereeId", currentItem.id);
    formData.append("message", message);
    fetch("/offers/addOffer", {
      method: "POST",
      body: formData,
    }).then((data) => console.log(data));

    const formDataMail = new FormData();
    formDataMail.append("emailRecipient", currentUser.email);
    const messageToSend = `User ${appUser.displayName} ${appUser.email} wants to swap ${offer.name} on your ${currentItem.name}. Added message: "${message}". `;
    formDataMail.append("message", messageToSend);
    formDataMail.append("emailSender", appUser.email);
    formDataMail.append("nameSender", appUser.displayName);

    fetch("/sendMail", {
      method: "POST",
      body: formDataMail,
    }).then((data) => console.log(data));

    setIsOpen(false);
  };

  return (
    <Modal isOpen={open}>
      <Form>
        <select
          placeholder="Choose item to offer"
          onChange={(e) => {
            setOffer(userItems[e.target.value]);
          }}
        >
          <option>Select item to offer</option>
          {userItems.map((item) => {
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
          <button onClick={handleSubmitOffer}>Offer</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </ButtonWrapper>
      </Form>
    </Modal>
  );
};

const Modal = styled(ReactModal)`
  //background-color: #319365;

  position: absolute;
  width: 50%;
  height: 17%;
  outline: none;
  background: #fff;
  margin: auto;
  top: 30%;
  left: 30%;
  border-radius: 20px;
`;
const Form = styled.form`
  background-color: #319365;
  background-image: url(${back});
  height: 100%;
  width: 100%;
  font-family: "RocknRoll One", sans-serif;
  font-size: 12pt;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffd800;
  font-weight: 600;
  select {
    width: 50%;
    margin: 10px;
  }
  textarea {
    width: 50%;
    height: 30%;
    margin: 10px;
    border-radius: 5px;
  }
  button {
    width: 30%;
    border-radius: 5px;
    display: inline-block;
  }
`;
const ButtonWrapper = styled.div`
  margin-top: 20px;
  width: 40%;
  display: flex;
  justify-content: space-around;
`;

export default OfferModal;
