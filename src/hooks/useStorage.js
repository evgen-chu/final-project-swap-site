import { useState, useEffect } from "react";
// import {
//   projectStorage,
//   projectFirestore,
//   timestamp,
// } from "../../server/firebase/config";

const useStorage = (file, submit, form) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const [id, setId] = useState(11);

  useEffect(() => {
    // const storageRef = projectStorage.ref(file.name);
    // const collectionRef = projectFirestore.collection("images");

    // storageRef.put(file).on(
    //   "state_changed",
    //   (snap) => {
    //     let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
    //     setProgress(percentage);
    //   },
    //   (err) => {
    //     setError(err);
    //   },
    //   async () => {
    //     const url = await storageRef.getDownloadURL();
    //     const createdAt = timestamp();
    //     collectionRef.add({ url, createdAt });
    //     //await collectionRef.doc(url).set(url);
    //     setUrl(url);
    //   }
    // );
    if (file) {
      console.log(file);
      const formData = new FormData();
      formData.append("file", file);
      // TODO put productId to make it able to bind image to specific product
      formData.append("productId", id);
      formData.append("productName", form.name);
      formData.append("productDescription", form.description);
      formData.append("productLocation", form.location);
      formData.append("productCategory", form.category);
      fetch("/items/addItem", {
        method: "POST",
        // headers: { "Content-Type": "multipart/form-data" },
        body: formData,
      }).then((data) => console.log(data));

      setId(id + 1);
    }
  }, [submit]);

  return { progress, url, error };
};

export default useStorage;
