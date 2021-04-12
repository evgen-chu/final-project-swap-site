import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ItemDetails = (itemId) => {
  const [currentItem, setCurrentItem] = useState(null);
  useEffect(() => {
    fetch(`/items/${itemId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCurrentItem(data);
      });
  }, []);
  return (
    <Wrapper>
      {/* {<div>
        <img src={currentItem.imageUrl} />
      </div>
      <div>{currentItem.name}</div>
      <div>{currentItem.description}</div>
      <div>{currentItem.category}</div>} */}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default ItemDetails;
