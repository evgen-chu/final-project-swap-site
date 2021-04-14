import { useState, useEffect } from "react";

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    fetch(`/${collection}`)
      .then((res) => res.json())
      .then((data) => console.log(data));
    // const unsub = projectFirestore
    //   .collection(collection)
    //   .orderBy("createdAt", "desc")
    //   .onSnapshot((snap) => {
    //     let documents = [];
    //     snap.forEach((doc) => {
    //       documents.push({ ...doc.data(), id: doc.id });
    //     });
    //     setDocs(documents);
    //   });
    // return () => unsub();
  }, [collection]);
  return { docs };
};

export default useFirestore;
