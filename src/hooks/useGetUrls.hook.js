import { useState, useEffect } from "react";
import { firebaseApp } from "../AppContext";

export const useGetUrls = (userItems) => {
  const [imgUrls, setImgUrls] = useState([]);

  const setItems = async () => {
    if (userItems) {
      console.log(userItems);
      const tempUrls = [];

      let promises = userItems.map((item) => {
        return firebaseApp
          .storage()
          .ref(item.images[0].fileName)
          .getDownloadURL();
      });
      await Promise.all(promises).then((results) => {
        results.forEach((result, index) => {
          const item = userItems[index];
          tempUrls.push({
            id: item.id,
            url: result,
            description: item.description,
            category: item.category,
            location: item.location,
            name: item.name,
            user: item.user,
            numOfSwaps: item.numOfSwaps,
            created: item.created,
          });
        });
      });
      return tempUrls;
    }
    return [];
  };
  useEffect(async () => {
    let tempUrls = await setItems();
    console.log(tempUrls);
    setImgUrls(tempUrls);
    //setStatus("idle");
  }, [userItems]);
  return imgUrls;
};
