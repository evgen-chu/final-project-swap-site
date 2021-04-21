import React, { useState, useContext, useEffect } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import { AppContext } from "./AppContext";

const MessageModal = ({ open, setIsOpen, currentUser, currentItem }) => {
  const { appUser, appUserItems } = useContext(AppContext);
  const [message, setMessage] = useState(null);

  const handleSendMessage = () => {
    const formData = new FormData();
    formData.append("emailRecipient", currentUser.email);
    formData.append("message", message);
    formData.append("emailSender", appUser.email);
    formData.append("nameSender", appUser.displayName);

    fetch("/sendMail", {
      method: "POST",
      // headers: { "Content-Type": "multipart/form-data" },
      body: formData,
    }).then((data) => console.log(data));
    setIsOpen(false);
  };
  return (
    <Modal isOpen={open}>
      <Form>
        <textarea
          placeholder="Type your message"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <ButtonWrapper>
          <button onClick={handleSendMessage}>Send Message</button>
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

export default MessageModal;
