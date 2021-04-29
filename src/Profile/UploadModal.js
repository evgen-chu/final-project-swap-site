import React, { useState } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import useStorage from "../hooks/useStorage";
import Map from "../Map";
import back from "../assets/section9.png";

const UploadModal = ({ isOpen, setOpen, itemAdded, setItemAdded }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    district: "",
    location_lat: null,
    location_lng: null,
  });
  const [submit, setSubmit] = useState(false);

  const types = ["image/png", "image/jpeg"];
  const categories = ["Easy", "Intermidiate", "Expert"];
  const { id } = useStorage(file, submit, form, itemAdded, setItemAdded);
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
      setSubmit(!submit);
      //setItemAdded(!itemAdded);
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
          placeholder="Care level"
          onChange={(e) => {
            setForm({ ...form, category: e.target.value });
          }}
        >
          <option> Choose care level</option>
          {categories.map((item, index) => (
            <option key={item + "-" + index}>{item}</option>
          ))}
        </select>
        <input
          className="district"
          type="text"
          placeholder="your district"
          onChange={(e) => {
            setForm({ ...form, district: e.target.value });
          }}
        />
        <label> Choose location:</label>
        <MapWrapper>
          <ChooseLocation
            form={form}
            setForm={setForm}
            itemAdded={itemAdded}
            setItemAdded={setItemAdded}
          />
        </MapWrapper>

        <ButtonWrapper>
          <button
            onClick={(ev) => {
              handleSubmit(ev);
            }}
          >
            Add
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
  //background-color: #319365;

  position: absolute;
  width: 50%;
  height: 50%;
  outline: none;
  background: #fff;
  margin: auto;
  top: 30%;
  left: 30%;
  border-radius: 20px;
`;
const Form = styled.form`
  background-color: #319365;
  background-image: url(${back});
  height: 100%;
  width: 100%;
  font-family: "RocknRoll One", sans-serif;
  font-size: 12pt;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffd800;
  font-weight: 600;
  input {
    width: 50%;
    height: 20px;
    margin: 10px;
    border-radius: 4px;
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
    width: 30%;
    border-radius: 5px;
    display: inline-block;
  }
`;
const ButtonWrapper = styled.div`
  margin-top: 20px;
  width: 40%;
  display: flex;
  justify-content: space-around;
`;
const ChooseLocation = styled(Map)`
  width: 80%;
  // width: 50%;
  // height: 20%;
  // visibility: visible;
  // z-index: 100;
`;
const MapWrapper = styled.div`
  width: 100%;
`;

export default UploadModal;
