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
    "Plants",
    "Books",
    "Board Games",
    "Sports",
    "Toys",
    "Music",
    "Computers",
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
    <Modal isOpen={isOpen}>
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

        <input
          type="text"
          placeholder="Location"
          onChange={(e) => {
            setForm({ ...form, location: e.target.value });
          }}
        />
        <ButtonWrapper>
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
        </ButtonWrapper>
      </Form>
    </Modal>
  );
};

const Modal = styled(ReactModal)`
  background-color: #f0f8ff;
  position: absolute;
  width: 50%;
  height: 20%;
  outline: none;
  background: #fff;
  margin: auto;
  top: 30%;
  left: 30%;
  border-radius: 20px;
`;
const Form = styled.form`
  background-color: #f0f8ff;
  height: 100%;
  width: 100%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    width: 50%;
    height: 20px;
    margin: 10px;
  }
  textarea {
    width: 50%;
    margin: 10px;
  }
  select {
    width: 50%;
    margin: 10px;
  }
  button {
    width: 20%;
    border-radius: 5px;
  }
`;
const ButtonWrapper = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-around;
`;

export default UploadModal;
