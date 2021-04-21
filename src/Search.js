import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { useHistory } from "react-router-dom";

const Search = ({ setItems }) => {
  const history = useHistory();
  const [searchItem, setSearchItem] = useState("");
  const [resultItems, setResultItems] = useState();
  const [index, setIndex] = useState(-1);

  const [isComponentVisible, setIsComponentVisible] = useState(true);
  const ref = useRef();
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
    if (searchItem.length > 2) {
      fetch(`/searchItem/${searchItem}`)
        .then((res) => res.json())
        .then((data) => {
          setResultItems(data.data);
        });
    }
  }, [searchItem]);

  return (
    <div>
      <Wrapper>
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
        <button
          onClick={(e) => {
            //setItems(resultItems);
          }}
        >
          Search
        </button>
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
                  {/* <Img src={item.imageSrc} />
                  <div className="price">{item.price}</div> */}
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
  width: 500px;
  margin-top: 3px;
  padding: 8px 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  height: 300px;
  overflow: scroll;
  overflow-x: hidden;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  z-index: 5;
`;
const Suggestion = styled.li`
  padding: 3px 20px;
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

export default Search;
