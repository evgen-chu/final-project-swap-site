import React, { useEffect } from "react";
import useStorage from "./hooks/useStorage";
import styled from "styled-components";

const ProgressBar = ({ file, setFile }) => {
  const { url, progress } = useStorage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return <div className="progress-bar" style={{ width: progress + "%" }}></div>;
};

const Progress = styled.div`
  height: 5px;
  background: black;
  margin-top: 20px;
`;

export default ProgressBar;
