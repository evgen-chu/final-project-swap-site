import React, { useState } from "react";
import ReactModal from "react-modal";
import ProgressBar from "./ProgressBar";
import styled from "styled-components";
import useStorage from "./hooks/useStorage";

const UploadModal = ({ isOpen, setOpen }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    location: "",
  });
  const [submit, setSubmit] = useState(false);
  // const [tags, setTags] = useState([]);
  // const [tag, setTag] = useState(null);

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
  const { url } = useStorage(file, submit, form);
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

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (file) {
      //   const { url } = useStorage(file, submit, form);
      setSubmit(!submit);
      setOpen(false);
    }
  };

  return (
    <ReactModal isOpen={isOpen}>
      <Form>
        <input className="file" type="file" onChange={changeHandler} />
        <div className="output">
          {file && <div className="file">{file.name}</div>}
          {error && <div className="error">{error}</div>}
        </div>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
          }}
        />
        <textarea
          placeholder="description"
          onChange={(e) => {
            setForm({ ...form, description: e.target.value });
          }}
        />
        <select
          placeholder="category"
          onChange={(e) => {
            setForm({ ...form, category: e.target.value });
          }}
        >
          {categories.map((item, index) => (
            <option key={item + "-" + index}>{item}</option>
          ))}
        </select>
        {/*<div>
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
            {tags.map((item) => (
              <button>{item}</button>
            ))}
          </div>
        )} */}
        <input
          type="text"
          placeholder="Location"
          onChange={(e) => {
            setForm({ ...form, location: e.target.value });
          }}
        />
        <button
          onClick={(ev) => {
            handleSubmit(ev);
          }}
        >
          Add item
        </button>
        <button
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancel
        </button>
      </Form>
    </ReactModal>
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
  button {
    width: 20%;
  }
`;

export default UploadModal;
