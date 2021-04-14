import React, { useState } from "react";
import styled from "styled-components";
import ImageGrid from "./ImageGrid";
import UploadForm from "./UploadForm";
import UploadModal from "./UploadModal";

const Profile = () => {
  const [open, setOpen] = useState(false);
  return (
    <Wrapper>
      <div>Profile</div>
      <button
        onClick={(e) => {
          setOpen(true);
        }}
      >
        Add item
      </button>
      <UploadModal isOpen={open} setOpen={setOpen} />
      {/* <ImageGrid /> */}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Profile;
