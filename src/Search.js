import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { useHistory, useLocation } from "react-router-dom";

const Search = ({
  setItems,
  searchApplied,
  setSearchApplied,
  searchItem,
  setSearchItem,
}) => {
  const history = useHistory();

  const [resultItems, setResultItems] = useState();
  const [index, setIndex] = useState(-1);

  const [isComponentVisible, setIsComponentVisible] = useState(true);
  const ref = useRef();
  const location = useLocation();
  const handleClickOutside = (e) => {
    if (ref.current) {
      if (!ref.current.contains(e.target)) {
        setIsComponentVisible(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    console.log(searchItem);
    if (searchItem && searchItem.length > 2) {
      console.log("in search");
      fetch(`/searchItem/${searchItem}`)
        .then((res) => res.json())
        .then((data) => {
          setResultItems(data.data);
        });
    }
  }, [searchItem]);

  return (
    <div>
      <Wrapper location={location}>
        <Input
          id="search"
          type="text"
          placeholder="What plant are you looking for?"
          value={searchItem}
          onChange={(ev) => {
            setSearchItem(ev.target.value);
          }}
          onFocus={() => setIsComponentVisible(true)}
          onKeyDown={(ev) => {
            switch (ev.key) {
              case "Enter": {
                history.push(`/items/${resultItems[index].id}`);
                setIndex(-1);
                setSearchItem("");
                setResultItems(null);
                return;
              }
              case "ArrowUp": {
                if (index > 0) {
                  setIndex(index - 1);
                }

                return;
              }
              case "ArrowDown": {
                if (index < resultItems.length - 1) setIndex(index + 1);
                return;
              }
            }
          }}
        />
        <SearchIcon />
        {location.pathname === "/home" && (
          <Button
            onClick={(e) => {
              setItems(resultItems);
              setSearchApplied(true);
            }}
          >
            Search
          </Button>
        )}
      </Wrapper>
      {isComponentVisible && resultItems && searchItem.length >= 2 && (
        <SuggestionWrapper ref={ref} visible={isComponentVisible}>
          <ul>
            {resultItems.map((item, ind) => {
              var isSelected = index === ind;
              return (
                <Suggestion
                  key={Math.random() * 10000}
                  style={{
                    background: isSelected
                      ? "hsl(195, 1%, 90%, 0.25)"
                      : "transparent",
                  }}
                  onClick={() => {
                    history.push(`/items/${item.id}`);
                    setIndex(-1);
                    setSearchItem("");
                    setResultItems(null);
                  }}
                  onMouseEnter={(ev) => {
                    setIndex(ind);
                  }}
                >
                  <Img src={item.images[0].publicLink} />
                  <div>{item.name}</div>
                </Suggestion>
              );
            })}
          </ul>
        </SuggestionWrapper>
      )}
    </div>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  @media (max-width: 900px) {
    position: absolute;
    //top: 420px;
    left: 120px;
    top: ${(props) =>
      props.location.pathname === "/home" ? "420px" : "100px"};
  }
`;
const Input = styled.input`
  width: 300px;
  height: 30px;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 2px 23px 2px 30px;
  outline: 0;
  background-color: #f5f5f5;
  &:hover,
  &:focus {
    border: 1.5px solid #3d3c47;
    background-color: white;
  }
`;
const SearchIcon = styled(FiSearch)`
  position: absolute;
  top: 3px;
  left: 5px;
`;
const SuggestionWrapper = styled.div`
  position: absolute;
  width: 370px;
  margin-top: 3px;
  padding: 8px 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  height: 100px;
  overflow: scroll;
  overflow-x: hidden;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  z-index: 5;
  @media (max-width: 900px) {
    left: 120px;
    top: 455px;
  }
`;
const Suggestion = styled.li`
  padding: 3px;
  font-size: 18px;
  line-height: 24px;
  color: black;
  display: flex;
  align-items: center;
  .price {
    font-weight: bold;
    margin-right: 30px;
  }
  cursor: pointer;
`;
const Img = styled.img`
  height: 30px;
  width: 30px;
  margin-right: 30px;
`;

const Button = styled.div`
  border-radius: 5px;
  height: 30px;
  font-family: "RocknRoll One", sans-serif;
  font-size: 12pt;
  display: flex;
  align-items: center;
  border: 1px solid #414042;
  margin-left: 10px;
  width: 60px;
`;

export default Search;
