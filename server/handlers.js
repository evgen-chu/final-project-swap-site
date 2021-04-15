const { sendResponse } = require("./utils");
const users = require("./users.json");
const items = require("./items.json");
const firebase = require("firebase-admin");
require("firebase/storage");
require("firebase/firestore");
global.XMLHttpRequest = require("xhr2");
const uuidv4 = require("uuid/v4");

require("dotenv").config();

var serviceAccount = require("C:\\Users\\eugen\\Documents\\concordia-bootcamps\\final-project\\fp-swap-site\\server\\swap-app-key.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),

  projectId: process.env.FIREBASE_PROJECT_ID,
  databaseURL: process.env.FB_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});
const storage = firebase.storage();
const db = firebase.firestore();
const bucketName = process.env.FIREBASE_STORAGE_BUCKET;

//GET item by id
const getItemById = async (req, res) => {
  const id = req.params.itemId;
  const db = firebase.firestore();
  const docRef = db.collection("items").doc(id);
  const doc = await docRef.get();
  if (!doc.exists) {
    console.log("No such document!");
  } else {
    console.log("Document data:", doc.data());
  }

  return sendResponse(res, 200, doc.data());
};

//GET user by id

const getUserById = async (req, res) => {
  const id = req.params.userId;
  const db = firebase.firestore();
  const docRef = db.collection("users").doc(id);
  const doc = await docRef.get();
  if (!doc.exists) {
    console.log("No such document!");
  } else {
    console.log("Document data:", doc.data());
  }

  return sendResponse(res, 200, doc.data());
};
//GET all items of the user with specified id
const getItemsByUserId = async (req, res) => {
  const id = req.params.userId;
  const db = firebase.firestore();
  const docRef = db.collection("items");
  //const doc = await

  docRef
    .where("user", "==", id)
    .get()
    .then((querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        temp.push({ ...doc.data(), id: doc.id });
      });
      sendResponse(res, 200, temp);
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  //return sendResponse(res, 200, temp);
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

  blobWriter.on("finish", (result) => {
    console.log("result");
    console.log(result);
    console.log("file name: " + blob.name);
    return sendResponse(res, 200, req.file.name);
  });

  blobWriter.end(req.file.buffer);
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
  const snapshot = await ref.where("email", "==", key).get();

  if (snapshot.empty) return null;
  else {
    const temp = [];
    snapshot.forEach((doc) => {
      temp.push(doc);
    });
    return temp[0].data();
  }
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
  console.log(req.body.email);
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
    //await appUsersRef.doc(uuidv4()).set(req.body);
    await appUsersRef.doc("1").set(req.body);
    res.status(200).json({
      status: 200,
      data: req.body,
      message: "new user",
    });
    return;
  }
};

module.exports = {
  createUser,
  getItemById,
  getAllItems,
  addItem,
  getUserById,
  getItemsByUserId,
};
