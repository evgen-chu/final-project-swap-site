import React, { useEffect, useState } from "react";
import styled from "styled-components";
import plantExchange from "./assets/plant-exchange.jpg";
import { firebaseApp } from "./AppContext";
import ImageGrid from "./ImageGrid";
import Search from "./Search";
import PageSelect from "./PageSelect";

const LandingPage = () => {
  const [items, setItems] = useState([]);
  const [imgUrls, setImgUrls] = useState([]);
  const [page, setPage] = React.useState(1);
  useEffect(() => {
    fetch(`/getitems?category=Plants&page=${page}&limit=9`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setItems(data.data);
      });
  }, [page]);

  ///===========================
  const setItems1 = async () => {
    if (items) {
      console.log(items);
      const tempUrls = [];

      let promises = items.map((item) => {
        return firebaseApp
          .storage()
          .ref(item.images[0].fileName)
          .getDownloadURL();
      });
      await Promise.all(promises).then((results) => {
        results.forEach((result, index) => {
          const item = items[index];
          tempUrls.push({
            id: item.id,
            url: result,
            name: item.name,
            category: item.category,
          });
        });
      });
      return tempUrls;
    }
    return [];
  };
  useEffect(async () => {
    let tempUrls = await setItems1();
    console.log(tempUrls);
    setImgUrls(tempUrls);
  }, [items]);
  return (
    <Wrapper>
      <Banner>
        <Img src={plantExchange} />
      </Banner>
      <SearchBar setItems={setItems} />

      <Divider />
      <ImageGrid items={imgUrls} />
      <PageSelect page={page} setPage={setPage} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Banner = styled.div`
  width: 100%;
  height: 500px;
  img {
    width: 100%;
    height: 400px;
  }
`;

const Img = styled.img`
  width: 100%;
  min-height: 500px;
`;
const Divider = styled.div`
  height: 1px;
  background-color: black;
`;
const SearchBar = styled(Search)`
  position: absolute;
  left: 35%;
  top: 50%;
  button {
    border-radius: 5px;
    margin-left: 10px;
    width: 70px;
  }
`;
const Input = styled.input`
  width: 300px;
  height: 40px;
  border-radius: 5px;
`;

export default LandingPage;
