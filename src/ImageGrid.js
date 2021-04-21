import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { AppContext } from "./AppContext";

const ImageGrid = ({ items, deleteFlag, setDeleteFlag, currentUser }) => {
  const { appUser } = useContext(AppContext);
  const history = useHistory();
  const [updatedItems, setUpdatedItems] = useState(null);
  useEffect(() => {
    setUpdatedItems(items);
  }, [items]);

  const handleDelete = (e, id) => {
    e.stopPropagation();
    console.log("Delete this item!");
    fetch(`/items/${id}/delete`, { method: "DELETE" }).then((res) => {
      console.log(res);
    });
    setDeleteFlag(!deleteFlag);
  };
  return (
    <ImgWrapper className="img-grid">
      {updatedItems &&
        // items.length > 0 &&
        updatedItems.map((item) => {
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
              <Img src={item.url} alt="uploaded pic" />
              <div className="name">{item.name}</div>
              {/* <div className="category">{item.category}</div> */}
            </ItemWrapper>
          );
        })}
    </ImgWrapper>
  );
};

const ImgWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const Img = styled.img`
  width: 200px;
  height: 200px;
`;
const ItemWrapper = styled.div`
  display: flex;
  flex: 0 0 23%;
  position: relative;

  flex-direction: column;
  align-items: center;

  border-radius: 20px;
  margin: 20px;
  box-shadow: 2px 6px 24px -3px rgba(0, 0, 0, 0.53);
  .category {
    opacity: 60%;
    font-size: 10pt;
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
