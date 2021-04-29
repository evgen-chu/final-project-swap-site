import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./AppContext";
import tipRecieved from "./assets/tip-received.svg";
import { useHistory } from "react-router-dom";
import back from "./assets/section9.png";
import top from "./assets/section7top.png";
import bottom from "./assets/section11top.png";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

const Offers = () => {
  const history = useHistory();
  const {
    appUser,
    newOffers,
    offerStatusChanged,
    setOfferStatusChanged,
  } = useContext(AppContext);
  console.log("New offers:", newOffers);

  const handleAcceptSwap = (offer) => {
    //to change status of offer to "accepted"
    //to delete one item from bidder and add another, the same for offeree
    //change field numOfSwaps for users and items

    const formData = new FormData();
    const status = "accepted";
    formData.append("bidderUser", offer.userBidder.id);
    formData.append("offereeUser", offer.userOfferee.id);
    formData.append("itemBidder", offer.itemBidder.id);
    formData.append("itemOfferee", offer.itemOfferee.id);
    formData.append("numOfSwaps_itemBid", offer.itemBidder.numOfSwaps + 1);
    formData.append("numOfSwaps_itemOff", offer.itemOfferee.numOfSwaps + 1);
    formData.append("numOfSwaps_userBid", offer.userBidder.numOfSwaps + 1);
    formData.append("numOfSwaps_userOff", offer.userOfferee.numOfSwaps + 1);
    formData.append("status", status);
    fetch(`/updateInfo/${offer._id}`, {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOfferStatusChanged(!offerStatusChanged);
      });

    const formDataMail = new FormData();
    formDataMail.append("emailRecipient", offer.user_offeree_email);
    const messageToSend = `User ${appUser.id} ${appUser.email} accepted your offer.`;
    formDataMail.append("message", messageToSend);
    formDataMail.append("emailSender", appUser.email);
    formDataMail.append("nameSender", appUser.displayName);

    fetch("/sendMail", {
      method: "POST",
      body: formDataMail,
    }).then((data) => console.log(data));
  };

  const handleRejectSwap = (offer) => {
    //change status of offer to rejected
    const formData = new FormData();
    const status = "rejected";
    formData.append("status", status);
    fetch(`/updateInfo/${offer._id}`, {
      method: "PUT",
      body: formData,
    }).then((data) => {
      setOfferStatusChanged(!offerStatusChanged);
    });

    const formDataMail = new FormData();
    formDataMail.append("emailRecipient", appUser.email);
    const messageToSend = `User ${appUser.displayName} ${appUser.email} rejected your offer.`;
    formDataMail.append("message", messageToSend);
    formDataMail.append("emailSender", appUser.email);
    formDataMail.append("nameSender", appUser.displayName);

    fetch("/sendMail", {
      method: "POST",
      body: formDataMail,
    }).then((data) => console.log(data));
  };

  return (
    <Wrapper>
      <SectionTop>
        <img alt="" src={top} />
      </SectionTop>
      {newOffers.length !== 0
        ? newOffers.map((offer) => {
            return (
              <OfferWrapper key={uuid()}>
                <BidderWrapper>
                  <WrapperUserInfo>
                    <MessageWrapper to={`/profile/${offer.userBidder.id}`}>
                      <div className="user-avatar">
                        <StyledAvatar src={offer.userBidder.photoURL} />
                      </div>
                      <Message className="message">{offer.message}</Message>
                    </MessageWrapper>
                  </WrapperUserInfo>

                  <ItemWrapper to={`/items/${offer.itemBidder.id}`}>
                    <ItemImg src={offer.itemBidder.mediaLink} />
                    <DescriptionWrapper>
                      <div className="name">{offer.itemBidder.name}</div>
                      <div className="location">
                        {" "}
                        {offer.itemBidder.location}
                      </div>
                      <div className="description">
                        {offer.itemBidder.description}
                      </div>
                      <div className="category">
                        Care level: {offer.itemBidder.category}
                      </div>
                    </DescriptionWrapper>
                  </ItemWrapper>
                </BidderWrapper>
                <ButtonWrapper>
                  <button
                    className="btn-accept"
                    onClick={() => handleAcceptSwap(offer)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn-reject"
                    onClick={() => handleRejectSwap(offer)}
                  >
                    Reject
                  </button>
                </ButtonWrapper>

                <AppUserWrapper>
                  <ImgWrapper to={`/items/${offer.itemOfferee.id}`}>
                    <ItemImg src={offer.itemOfferee.mediaLink} />
                  </ImgWrapper>
                  <div className="name">{offer.itemOfferee.name}</div>
                  <div className="location"> {offer.itemOfferee.location}</div>
                  <div className="category">
                    Care level: {offer.itemOfferee.category}
                  </div>
                </AppUserWrapper>
              </OfferWrapper>
            );
          })
        : history.push(`/profile/${appUser.id}`)}
      <SectionBottom>
        <img alt="" src={bottom} />
      </SectionBottom>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  //height: 91vh
  height: 100vh;
`;
const SectionTop = styled.div`
  height: 100px;
  background-color: #ffd800;
  img {
    width: 100%;
    height: 100px;
    margin: 0;
  }
  margin: 0;
`;
const SectionBottom = styled.div`
  height: 100px;
  img {
    width: 100%;
    height: 100px;
  }
`;
const OfferWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #fca44e;
  margin: 0;
`;
const BidderWrapper = styled.div`
  display: flex;
  margin: 20px;
  flex-direction: column;
  width: 40%;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  background-color: #319365;
  background-image: url(${back});
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
    font-size: 12pt;
    height: 300px;
    align-items: center;
  }
`;
const AppUserWrapper = styled.div`
  display: flex;
  margin: 20px;
  flex-direction: column;
  align-items: center;
  background-color: #319365;
  background-image: url(${back});
  width: 20%;
  height: 400px;
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
    font-size: 12pt;
    height: 300px;
    .category {
      visibility: hidden;
    }
  }
`;
const StyledAvatar = styled.img`
  border-radius: 50%;
  height: 100px;
  width: 100px;
  @media (max-width: 900px) {
    height: 50px;
    width: 50px;
  }
`;
const WrapperUserInfo = styled.div`
  display: flex;
  width: 100%;
  self-align: center;
  border-radius: 20px;
  height: 100px;
  background-color: #62c785;
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
const ItemImg = styled.img`
  width: 200px;
  height: 300px;
  border-radius: 20px;
  margin-right: 20px;
  @media (max-width: 900px) {
    width: 100px;
    height: 200px;
  }
`;

const ImgWrapper = styled(Link)`
  margin: auto;
  margin-top: 20px;
  width: 200px;
  height: 300px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .btn-accept {
    background-color: #319365;
    color: white;
    margin: 10px;
    border-radius: 5px;
    display: inline-block;
  }
  .btn-reject {
    background-color: #ff6666;
    color: white;
    margin: 10px;
    border-radius: 5px;
    display: inline-block;
  }
`;

const MessageWrapper = styled(Link)`
  text-decoration: none;
  color: #414042;
  display: flex;
  justify-content: center;

  .message {
    background-color: "#E9E9EB";
    margin: 20px;
    color: black;
    font-size: 16pt;
    width: 300px;
  }
  .message::before {
    content: url(${tipRecieved});
    position: relative;
    top: 1rem;
    left: -0.75rem;
  }
  .user-avatar {
    font-size: 10pt;
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 900px) {
    font-size: 12pt;
    width: 200px;
  }
`;
const Message = styled.div`
  background-color: #e9e9eb;
  width: 200px;
  height: 40px;
  border-radius: 5px;
`;
const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemWrapper = styled(Link)`
  display: flex;
  text-decoration: none;
  color: #414042;

  justify-content: space-between;
  @media (max-width: 900px) {
    .description {
      visibility: hidden;
    }
    display: flex;
    flex-direction: column;
    width: 20%;
    height: 400px;
  }
`;

export default Offers;
