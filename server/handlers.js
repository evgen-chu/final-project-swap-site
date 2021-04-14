const { sendResponse } = require("./utils");
const users = require("./users.json");
const items = require("./items.json");
// const admin = require("firebase-admin");
const firebase = require("firebase-admin");
require("firebase/storage");
require("firebase/firestore");
global.XMLHttpRequest = require("xhr2");

require("dotenv").config();

var serviceAccount = require("C:\\Users\\eugen\\Documents\\concordia-bootcamps\\final-project\\fp-swap-site\\server\\swap-app-key.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  // credential: admin.credential.cert({
  // type: "service_account",
  // project_id: process.env.FIREBASE_PROJECT_ID,
  // private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  // private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  // client_email: process.env.FIREBASE_CLIENT_EMAIL,
  // client_id: process.env.FIREBASE_CLIENT_ID,
  // auth_uri: "https://accounts.google.com/o/oauth2/auth",
  // token_uri: "https://oauth2.googleapis.com/token",
  // auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  // client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT,
  // }),
  projectId: process.env.FIREBASE_PROJECT_ID,
  databaseURL: process.env.FB_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});
const storage = firebase.storage();
const db = firebase.firestore();
const bucketName = process.env.FIREBASE_STORAGE_BUCKET;
// var serviceAccount = require("C:\\Users\\eugen\\Documents\\concordia-bootcamps\\final-project\\fp-swap-site\\server\\swap-app-key.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// GET user by id
// const getUserById = async (req, res) => {
//   const db = admin.firestore();
//   const docRef = db.collection("users").doc("alovelace");
//   console.log("ahahhaahah");
//   await docRef.set({
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815,
//   });
//   //const userId = params.userId;
//   // const user = users.find((user) => user._id === userId);
//   //return sendResponse(res, 200, user);
// };

//GET item by id
const getItemById = async (req, res) => {
  const itemId = req.params.itemId;
  console.log(itemId);
  //const item = items.find((item) => item._id === itemId);
  const db = firebase.firestore();
  const docRef = db.collection("items").doc(itemId);
  const doc = await docRef.get();
  if (!doc.exists) {
    console.log("No such document!");
  } else {
    console.log("Document data:", doc.data());
  }

  return sendResponse(res, 200, doc.data());
};

//POST add item
const addItem = async (req, res) => {
  const blob = storage
    .bucket(bucketName)
    .file("images/" + req.body.productId + "/" + req.file.originalname);

  const items = db.collection("items");
  const product = items.doc(req.body.productId);
  const images = product.images != null ? product.images : [];
  const fileName = blob.name;
  const createdAt = Date.now();
  images.push({ fileName: fileName, created: createdAt });
  product.set({
    name: req.body.productName,
    created: Date.now(),
    images: images,
    description: req.body.productDescription,
    category: req.body.productCategory,
    location: req.body.productLocation,
    numOfSwaps: 0,
    user: 2,
  });

  const blobWriter = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  blobWriter.on("error", (err) => {
    console.log(err);
  });

  blobWriter.on("finish", () => {
    console.log("file name: " + blob.name);
    return sendResponse(res, 200, req.file.name);
  });

  blobWriter.end(req.file.buffer);

  // const storageRef = storage.ref();
  // const fileRef = storageRef.child("test2.jpg");
  // const collectionRef = db.collection("images");

  // fileRef.put(req.file.buffer).then(async (upd) => {
  //   const url = await fileRef.getDownloadURL();
  //   const createdAt = Date.now();
  //   collectionRef.add({ url: url, created: createdAt });
  // });
  // .on(
  //   "state_changed",
  //   // (snap) => {
  //   //   let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
  //   //   setProgress(percentage);
  //   // },
  //   (err) => {
  //     // setError(err);
  //     // console.log(err);
  //   },
  //   async () => {
  //     console.log("done!");
  //     const url = await fileRef.getDownloadURL();
  //     const createdAt = timestamp();
  //     collectionRef.add({ url: url, created: createdAt });
  //     setUrl(url);
  //   }
  // );
};

//GET all items

const getAllItems = async (req, res) => {
  console.log("here");
  const db = admin.firestore();
  const docsRef = db.collection("items");
  const snapshot = await docsRef.get();
  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
  const docs = await docsRef.get();
  if (!docs.exists) {
    console.log("No such document!");
  } else {
    console.log("Document data:", docs.data());
  }

  return sendResponse(res, 200, docs.data());
};

// used in workshop

const queryDatabase = async (col, key) => {
  const ref = db.collection(col);
  const data = await ref.doc(key).get();
  if (!data.exists) {
    return null;
  } else {
    return data.data();
  }
  // let data;
  // await ref.once(
  //   "value",
  //   (snapshot) => {
  //     data = snapshot.val();
  //   },
  //   (err) => {
  //     console.log(err);
  //   }
  // );

  // return data;
};
// this function will return either the user object or false.
const getUser = async (email) => {
  const data = await queryDatabase(`users`, email);
  return data;
  // const dataValue = Object.keys(data)
  //   .map((item) => data[item])
  //   .find((obj) => obj.email === email);

  // return dataValue || false;
};

const createUser = async (req, res) => {
  const returningUser = await getUser(req.body.email);
  if (returningUser != null) {
    console.log("Returning user");
    console.log(returningUser);
    res
      .status(200)
      .json({ status: 200, data: req.body, message: "returning user" });
    return;
  } else {
    const appUsersRef = db.collection("users");
    await appUsersRef.doc(req.body.email).set(req.body);
    res.status(200).json({
      status: 200,
      data: req.body,
      message: "new user",
    });
    return;
    // appUsersRef.set(req).then(() => {
    //   res.status(200).json({
    //     status: 200,
    //     data: req.body,
    //     message: "new user",
    //   });
    // });
  }
};

module.exports = {
  createUser,
  getItemById,
  getAllItems,
  addItem,
};
