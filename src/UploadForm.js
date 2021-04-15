import React, { useState } from "react";

import ProgressBar from "./ProgressBar";
import styled from "styled-components";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [item, setItem] = useState(null);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState(null);

  const types = ["image/png", "image/jpeg"];
  const categories = [
    "Books",
    "Board Games",
    "Sports",
    "Toys",
    "Music",
    "Computers",
    "Plants",
  ];
  const changeHandler = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select image file");
    }
  };

  const handleSubmit = () => {};

  return (
    <Form>
      <input className="file" type="file" onChange={changeHandler} />
      <div className="output">
        {file && <div className="file">{file.name}</div>}
        {error && <div className="error">{error}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
      <input type="text" placeholder="name" />
      <textarea placeholder="description" />
      <select placeholder="category">
        {categories.map((item, index) => (
          <option key={item + "-" + index}>{item}</option>
        ))}
      </select>
      <div>
        <input
          type="text"
          placeholder="Add tag"
          onChange={(e) => {
            setTag(e.target.value);
            console.log(tag);
          }}
        />
        <button
          onClick={(e) => {
            const temp = [...tags, tag];
            setTags(temp);
            console.log(tag);
            console.log(tags);
            setTag(null);
          }}
        >
          Add
        </button>
      </div>
      {tags.length > 0 && (
        <div>
          {tags.map((item, index) => (
            <button key={item + "-" + index}>{item}</button>
          ))}
        </div>
      )}

      <input type="submit" onClick={handleSubmit}></input>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  input {
    width: 20%;
    height: 20px;
    margin: 10px;
  }
  textarea {
    width: 20%;
    margin: 10px;
  }
  select {
    width: 20%;
    margin: 10px;
  }
`;

export default UploadForm;
