import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { AppContext } from "./AppContext";

const ImageGrid = ({ items, deleteFlag, setDeleteFlag, currentUser }) => {
  const { appUser } = useContext(AppContext);
  const history = useHistory();

  const handleDelete = (e, id) => {
    e.stopPropagation();
    fetch(`/items/${id}/delete`, { method: "DELETE" }).then((res) => {
      console.log(res);
    });
    setDeleteFlag(!deleteFlag);
  };
  return (
    <ImgWrapper className="img-grid">
      {items &&
        items.map((item) => {
          return (
            <ItemWrapper
              key={item.id}
              onClick={() => {
                history.push(`/items/${item.id}`);
              }}
            >
              {appUser && currentUser && appUser.id === currentUser.id && (
                <button
                  className="delete"
                  onClick={(e) => handleDelete(e, item.id)}
                >
                  -
                </button>
              )}
              <Img src={item.images[0].publicLink} alt="uploaded pic" />
              <div className="name">{item.name}</div>
              <div className="category">Care level: {item.category}</div>
              <div className="location">Montreal, {item.district}</div>
            </ItemWrapper>
          );
        })}
    </ImgWrapper>
  );
};

const ImgWrapper = styled.div`
  //min-width: 900px;
  //min-height: 200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;
const Img = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 0 0 20px 20px;
`;
const ItemWrapper = styled.div`
  background-color: #62c785;
  display: flex;
  flex: 0 0 24%;
  position: relative;

  flex-direction: column;
  align-items: center;

  border-radius: 20px;
  margin: 20px;
  box-shadow: 2px 6px 24px -3px rgba(0, 0, 0, 0.53);
  .name {
    font-size: 14pt;
  }
  .category {
    opacity: 60%;
    font-size: 10pt;
  }
  .location {
    font-size: 10pt;
    opacity: 70%;
  }
  .delete {
    position: absolute;
    background-color: red;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 20pt;
    font-weight: bold;
    visibility: hidden;
    opacity: 70%;
  }

  &:hover {
    .delete {
      visibility: visible;
    }
  }
`;

export default ImageGrid;
