import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { AppContext } from "./AppContext";
import tipSent from "./assets/tip-sent.svg";
import tipRecieved from "./assets/tip-received.svg";
import { useHistory } from "react-router-dom";

const Offers = () => {
  const history = useHistory();
  const {
    appUser,
    newOffers,
    setNewOffers,
    offerStatusChanged,
    setOfferStatusChanged,
  } = useContext(AppContext);
  const [bidderUser, setBidderUser] = useState(null);
  // const [offersInfo, setOffersInfo] = useState([]);
  console.log("New offers:", newOffers);
  // useEffect(() => {
  //   fetch(`/offers/${appUser.id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data.data);
  //       setNewOffers(data.data);
  //     });
  // }, [offerStatusChanged]);

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
      // headers: { "Content-Type": "multipart/form-data" },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOfferStatusChanged(!offerStatusChanged);
      });
  };
  const handleRejectSwap = (offer) => {
    //change status of offer to rejected
    const formData = new FormData();
    const status = "rejected";
    formData.append("status", status);
    fetch(`/updateInfo/${offer._id}`, {
      method: "PUT",
      // headers: { "Content-Type": "multipart/form-data" },
      body: formData,
    }).then((data) => {
      setOfferStatusChanged(!offerStatusChanged);
    });
  };

  return (
    <Wrapper>
      {newOffers.length !== 0
        ? newOffers.map((offer) => {
            console.log("MESSAGE:", offer.userBidder.message);
            return (
              <OfferWrapper>
                <BidderWrapper>
                  <WrapperUserInfo>
                    <MessageWrapper>
                      <div>
                        <StyledAvatar src={offer.userBidder.photoURL} />
                      </div>
                      <Message className="message">{offer.message}</Message>
                    </MessageWrapper>

                    {/* <div>
                    <div>{offer.userBidder.displayName}</div>
                    <div className="date">
                      Member since {offer.userBidder.registered}
                    </div>
                    <div> Has made {offer.userBidder.numOfSwaps} swaps</div>
                  </div> */}
                  </WrapperUserInfo>

                  <ItemWrapper>
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
                        {offer.itemBidder.category}
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
                  <ImgWrapper>
                    <ItemImg src={offer.itemOfferee.mediaLink} />
                  </ImgWrapper>
                  <div className="name">{offer.itemOfferee.name}</div>
                  <div className="location"> {offer.itemOfferee.location}</div>
                  {/* <div className="description">
                  {offer.itemOfferee.description}
                </div> */}
                  <div className="category">{offer.itemOfferee.category}</div>
                </AppUserWrapper>
              </OfferWrapper>
            );
          })
        : history.push(`/profile/${appUser.id}`)}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const OfferWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
`;
const BidderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
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
const AppUserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 500px;
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
const StyledAvatar = styled.img`
  border-radius: 50%;
  height: 100px;
  width: 100px;
`;
const WrapperUserInfo = styled.div`
  display: flex;
  width: 100%;
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
const ItemImg = styled.img`
  min-width: 200px;
  max-height: 300px;
  border-radius: 20px;
  margin: 20px;
`;

const ImgWrapper = styled.div`
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
    background-color: green;
    color: white;
    margin: 10px;
  }
  .btn-reject {
    background-color: red;
    color: white;
    margin: 10px;
  }
`;

const MessageWrapper = styled.div`
  display: flex;
  justify-content: center;

  .message {
    background-color: "#E9E9EB";
    margin: 20px;
    color: black;
    font-size: 16pt;
  }
  .message::before {
    content: url(${tipRecieved});
    position: relative;
    top: 1rem;
    left: -0.75rem;
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

const ItemWrapper = styled.div`
  display: flex;
`;
export default Offers;
