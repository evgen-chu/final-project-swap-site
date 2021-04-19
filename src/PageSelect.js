import React from "react";
import styled from "styled-components";

const PageSelect = ({ page, setPage }) => {
  const [nextPage, setNextPage] = React.useState(true);

  React.useEffect(() => {
    fetch(`/getitems?category=Plants&page=${page + 1}&limit=9`)
      .then((res) => res.json())
      .then(({ data }) => {
        data.length === 0 ? setNextPage(false) : setNextPage(true);
      });
  }, [page]);

  return (
    <Wrapper>
      <button
        onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : prev))}
        disabled={page === 1}
      >
        &lt;
      </button>
      <h3>{page}</h3>
      <button onClick={() => setPage((prev) => prev + 1)} disabled={!nextPage}>
        &gt;
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  bottom: -70px;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 120px;
  button {
    height: 20px;
  }
`;

export default PageSelect;
