import React, { createContext, useEffect, useState } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import firebase from "firebase";
import "firebase/auth";
import { useHistory } from "react-router-dom";
var firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDERID,
  appId: process.env.REACT_APP_APPID,
};
export const firebaseApp =
  !firebase.apps.length && firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export const AppContext = createContext(null);

const AppProvider = ({ children, signInWithGoogle, user, signOut }) => {
  const history = useHistory();
  const [appUser, setAppUser] = useState({});
  const [message, setMessage] = useState("");
  const [appUserItems, setAppUserItems] = useState(null);
  const [newOffers, setNewOffers] = useState([]);
  const [offerStatusChanged, setOfferStatusChanged] = useState(false);

  const handleSignOut = () => {
    //  history.push("/home");
    signOut();
    setAppUser({});
  };

  useEffect(() => {
    if (user) {
      console.log(user);
      fetch(`/users`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          setAppUser(json.data);
          setMessage(json.message);
        });
    }
  }, [user]);

  useEffect(() => {
    console.log("appUser", appUser);

    fetch(`/users/${appUser.id}/items`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setAppUserItems(data.data);
      });
  }, [appUser]);

  useEffect(() => {
    console.log(appUser);
    if (appUser) {
      fetch(`/offers/${appUser.id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          setNewOffers(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [appUser, offerStatusChanged]);
  console.log("context", newOffers);
  return (
    <AppContext.Provider
      value={{
        appUser,
        appUserItems,
        newOffers,
        setNewOffers,
        signInWithGoogle,
        handleSignOut,
        message,
        offerStatusChanged,
        setOfferStatusChanged,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(AppProvider);
