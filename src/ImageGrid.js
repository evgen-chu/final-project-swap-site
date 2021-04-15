import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ImageGrid = ({ items }) => {
  items && console.log(items);
  const [updatedItems, setUpdatedItems] = useState(null);
  useEffect(() => {
    setUpdatedItems(items);
  }, [items]);
  return (
    <ImgWrapper className="img-grid">
      {updatedItems &&
        // items.length > 0 &&
        updatedItems.map((item) => {
          console.log(item);
          return (
            <ItemWrapper key={item.id}>
              <Img src={item.url} alt="uploaded pic" />
              <div className="name">{item.name}</div>
              <div className="category">{item.category}</div>
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

  flex-direction: column;
  align-items: center;

  border-radius: 20px;
  margin: 20px;
  box-shadow: 2px 6px 24px -3px rgba(0, 0, 0, 0.53);
  .category {
    opacity: 60%;
    font-size: 10pt;
  }
`;

export default ImageGrid;
