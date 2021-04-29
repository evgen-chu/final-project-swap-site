import { useState, useEffect, useContext } from "react";
import { AppContext } from "../AppContext";
import { v4 as uuid } from "uuid";
const useStorage = (file, submit, form, itemAdded, setItemAdded) => {
  const { appUser } = useContext(AppContext);
  //const [id, setId] = useState(16);
  const id = uuid();
  useEffect(() => {
    if (file) {
      console.log(file);
      const formData = new FormData();
      formData.append("file", file);
      // TODO put productId to make it able to bind image to specific product
      formData.append("productId", id);
      formData.append("productName", form.name);
      formData.append("productDescription", form.description);
      formData.append("productLocation_lat", form.location_lat);
      formData.append("productLocation_lng", form.location_lng);
      formData.append("productDistrict", form.district);
      formData.append("productCategory", form.category);
      formData.append("productUser", appUser.id);
      fetch("/items/addItem", {
        method: "POST",
        body: formData,
      }).then((data) => {
        console.log(data);
        setItemAdded(!itemAdded);
      });

      // setId(id + 1);
    }
  }, [submit]);

  return { id };
};

export default useStorage;
