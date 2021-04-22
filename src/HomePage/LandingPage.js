import React, { useEffect, useState } from "react";
import styled from "styled-components";
import plantExchange from "../assets/plant-exchange.jpg";
import banner_lp from "../assets/banner_lp.png";
import animation_lp from "../assets/girl-animation2.gif";
import divider_lp from "../assets/divider_lp.png";
import divider_lp2 from "../assets/divider_lp2.png";
import bottom from "../assets/section7top.png";
import plant2 from "../assets/plant2.png";
import { firebaseApp } from "../AppContext";
import ImageGrid from "../ImageGrid";
import Search from "../Search";
import PageSelect from "./PageSelect";
import ReactModal from "react-modal";
import Map from "../Map";

const LandingPage = () => {
  const [items, setItems] = useState([]);
  const [imgUrls, setImgUrls] = useState([]);
  const [page, setPage] = React.useState(1);
  const [searchApplied, setSearchApplied] = useState(false);
  const [deleteSearchTerm, setDeleteSearchTerm] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [openMap, setOpenMap] = useState(false);

  const componentDidMount = () => {
    setSearchItem("");
  };
  useEffect(() => {
    fetch(`/getitems?page=${page}&limit=9`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setItems(data.data);
      });
  }, [page, deleteSearchTerm]);

  const handleShowOnMap = (items) => {
    setOpenMap(true);
  };

  ///===========================
  // const setItems1 = async () => {
  //   if (items) {
  //     console.log(items);
  //     const tempUrls = [];

  //     let promises = items.map((item) => {
  //       return firebaseApp
  //         .storage()
  //         .ref(item.images[0].fileName)
  //         .getDownloadURL();
  //     });
  //     await Promise.all(promises).then((results) => {
  //       results.forEach((result, index) => {
  //         const item = items[index];
  //         tempUrls.push({
  //           id: item.id,
  //           url: result,
  //           name: item.name,
  //           category: item.category,
  //         });
  //       });
  //     });
  //     return tempUrls;
  //   }
  //   return [];
  // };
  // useEffect(async () => {
  //   let tempUrls = await setItems1();
  //   console.log(tempUrls);
  //   setImgUrls(tempUrls);
  // }, [items]);
  return (
    <Wrapper>
      <Banner>
        <Img src={animation_lp} />
        <SearchBar
          setItems={setItems}
          searchApplied={searchApplied}
          setSearchApplied={setSearchApplied}
          searchItem={searchItem}
          setSearchItem={setSearchItem}
        />
      </Banner>

      <Divider />
      <WrapperItemSection>
        {searchApplied ? (
          <>
            <div className="search-title">Search results: "{searchItem}" </div>
            <button
              className="show-on-map"
              onClick={() => handleShowOnMap(items)}
            >
              Show on map
            </button>
          </>
        ) : (
          <div className="gallery-title">Plant Gallery</div>
        )}
        <ImageGrid items={items} />
        {searchApplied && (
          <button
            className="back-to-gallery"
            onClick={(e) => {
              setSearchApplied(false);
              setDeleteSearchTerm(!deleteSearchTerm);
              setSearchItem("");
            }}
          >
            Back to gallery
          </button>
        )}
      </WrapperItemSection>
      {!searchApplied && <PageSelect page={page} setPage={setPage} />}
      <SecondDivider />
      {/* <PlantSection>
        <img src={plant2} />
      </PlantSection> */}
      <Modal isOpen={openMap}>
        <Map items={items} />
        <button className="close-btn" onClick={(e) => setOpenMap(false)}>
          Close
        </button>
      </Modal>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #319365;
`;
const Banner = styled.div`
  width: 100%;
  height: 550px;
  background-color: #ffd800;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  @media (max-width: 900px) {
    width: 100%;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;
const PlantSection = styled.div`
  width: 100%;
  background-color: #ffd800;
  img {
    width: 200px;
    height: 300px;
  }
`;

const Img = styled.img`
  width: 50%;
  height: 110%;
`;
const Divider = styled.div`
  width: 100%;
  height: 100px;
  background-image: url(${divider_lp2});
  background-repeat: no-repeat;
  background-position: bottom center;
  background-size: 100% 100%;
  font-size: 2.5rem;
`;
const SecondDivider = styled.div`
  width: 100%;
  height: 100px;
  background-image: url(${bottom});
  background-repeat: no-repeat;
  background-position: bottom center;
  background-size: 100% 100%;
  font-size: 2.5rem;
`;
const SearchBar = styled(Search)`
  margin-left: 30px;
`;
const Input = styled.input`
  width: 300px;
  height: 40px;
  border-radius: 5px;
`;
const WrapperItemSection = styled.div`
  background-color: #319365;
  min-width: 70%;
  .search-title {
    font-size: 14pt;
    margin: 40px;
  }
  .gallery-title {
    font-size: 20pt;
  }
  .back-to-gallery {
    border-radius: 5px;
    width: 100px;
    height: 40px;
    font-size: 10pt;
  }
  .show-on-map {
    background-color: #319365;
    border: none;
    width: 200px;
    color: #fca44e;
    display: inline-block;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Modal = styled(ReactModal)`
  position: absolute;
  width: 60%;
  height: 30%;
  outline: none;
  background: #fff;
  margin: auto;
  top: 30%;
  left: 30%;
  border-radius: 20px;
  z-index: 5;
  .close-btn {
    border-radius: 5px;
    width: 60px;
  }
`;

export default LandingPage;
