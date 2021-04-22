const { sendResponse, searchForItem, paginatedResults } = require("./utils");

const firebase = require("firebase-admin");
require("firebase/storage");
require("firebase/firestore");
global.XMLHttpRequest = require("xhr2");
const uuidv4 = require("uuid/v4");

require("dotenv").config();

var serviceAccount = require("C:\\Users\\eugen\\Documents\\concordia-bootcamps\\final-project\\fp-swap-site\\server\\swap-app-key.json");
const { logDOM } = require("@testing-library/dom");

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
const getItemById_ = async (id) => {
  const db = firebase.firestore();
  const docRef = db.collection("items").doc(id);
  const doc = await docRef.get();
  let mediaLink;
  if (!doc.exists) {
    console.log("No such document!");
  } else {
    console.log("Document data:", doc.data());
    const imagePath = doc.data().images[0].fileName;
    mediaLink = await storage
      .bucket(bucketName)
      .file(imagePath)
      .getMetadata()
      .then((results) => {
        const meta = results[0];
        return meta.mediaLink;
      });
  }
  return { ...doc.data(), id: doc.id, mediaLink };
};
const getItemById = async (req, res) => {
  const id = req.params.itemId;
  const item = await getItemById_(id);

  return sendResponse(res, 200, item);
};

//GET user by id

const getUserById_ = async (id) => {
  const db = firebase.firestore();
  const docRef = db.collection("users").doc(id);
  const doc = await docRef.get();
  if (!doc.exists) {
    console.log("No such document!");
  } else {
    // console.log("Document data:", doc.data());
  }
  return { ...doc.data(), id: doc.id };
};

const getUserById = async (req, res) => {
  const id = req.params.userId;
  const user = await getUserById_(id);
  return sendResponse(res, 200, user);
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
        //console.log(doc.id, " => ", doc.data());
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

  const blobWriter = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  blobWriter.on("error", (err) => {
    console.log(err);
  });

  blobWriter.on("finish", async (result) => {
    console.log("result");
    console.log(result);
    console.log("file name: " + blob.name);
    let mediaLink = await blob.getMetadata().then((results) => {
      const meta = results[0];
      return meta.mediaLink;
    });

    console.log("Media link: " + mediaLink);
    const items = db.collection("items");
    const product = items.doc(req.body.productId);
    const images = product.images != null ? product.images : [];
    const fileName = blob.name;
    const createdAt = Date.now();
    images.push({
      fileName: fileName,
      created: createdAt,
      publicLink: mediaLink,
    });
    product.set({
      id: req.body.productId,
      name: req.body.productName,
      created: Date.now(),
      images: images,
      description: req.body.productDescription,
      category: req.body.productCategory,
      district: req.body.productDistrict,
      location_lat: req.body.productLocation_lat,
      location_lng: req.body.productLocation_lng,
      numOfSwaps: 0,
      user: req.body.productUser,
    });
    return sendResponse(res, 200, req.file.name);
  });
  blobWriter.end(req.file.buffer);
};

//GET all items with specific category (in my case Plants)
// or get several items by id

const getAllItems = async (req, res) => {
  //const category = req.query.category;
  const ids = req.query.id;
  const db = firebase.firestore();
  const docsRef = db.collection("items");

  const snapshot = await docsRef.get();
  if (snapshot.empty)
    return sendResponse(res, 404, category, "no such category");
  else {
    const temp = [];
    snapshot.forEach((doc) => {
      temp.push({ ...doc.data(), id: doc.id });
    });
    return sendResponse(res, 200, paginatedResults(req, temp));
  }

  if (ids) {
    const snapshot = await docsRef.where("_id", "in", ids).get();
    if (snapshot.empty) return sendResponse(res, 404, category, "no such item");
    else {
      const temp = [];
      snapshot.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      return sendResponse(res, 200, temp);
    }
  }
};

// creating new user in DB or retrieving the one that is already there

const queryDatabase = async (col, key) => {
  const ref = db.collection(col);
  const snapshot = await ref.where("email", "==", key).get();

  if (snapshot.empty) return null;
  else {
    const temp = [];
    snapshot.forEach((doc) => {
      temp.push({ ...doc.data(), id: doc.id });
    });
    return temp[0];
  }
};

// this function will return either the user object or false.
const getUser = async (email) => {
  const data = await queryDatabase(`users`, email);
  return data;
};

const createUser = async (req, res) => {
  console.log(req.body.email);
  const returningUser = await getUser(req.body.email);

  if (returningUser != null) {
    console.log("Returning user");
    console.log(returningUser);
    res
      .status(200)
      .json({ status: 200, data: returningUser, message: "returning user" });
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

// here i will add all logic for offering

//PUT create new offer
const createOffer = (req, res) => {
  console.log(req.body);
  const items = db.collection("offers");
  //req.body.offerId
  const id = uuidv4();
  const offer = items.doc(id);

  const createdAt = Date.now();
  offer.set({
    user_bidder_id: req.body.userBidder,
    user_offeree_id: req.body.userOfferee,
    item_bidder_id: req.body.itemBidderId,
    item_offeree_id: req.body.itemOffereeId,
    message: req.body.message,
    status: "pending",
    created: createdAt,
  });
  return sendResponse(res, 200, req.body);
};

//get info for each offer
const getOfferInfo = async (offers) => {
  const temp = offers.map(async (offer) => {
    const userBidder = await getUserById_(offer.user_bidder_id);
    const itemBidder = await getItemById_(offer.item_bidder_id);
    const itemOfferee = await getItemById_(offer.item_offeree_id);
    const userOfferee = await getUserById_(offer.user_offeree_id);
    return {
      _id: offer._id,
      created: offer.created,
      message: offer.message,
      userBidder,
      itemBidder,
      userOfferee,
      itemOfferee,
    };
  });
  return await Promise.all(temp);
};

//GET all offers by user id
const getOffersByUserId = async (req, res) => {
  const id = req.params.userId;
  const ref = db.collection("offers");
  const snapshot = await ref
    .where("user_offeree_id", "==", id)
    .where("status", "==", "pending")
    .get();

  try {
    if (snapshot.empty) {
      return sendResponse(res, 404, [], "there is no offers");
    } else {
      const temp = [];
      snapshot.forEach((doc) => {
        temp.push(doc.data());
      });
      // get data about bidder(user, item) and offeree(item) for each offer doc
      console.log("Temp here:", temp);
      const result = await getOfferInfo(temp);
      console.log("Result:");
      console.log(result);
      return sendResponse(res, 200, result);
    }
  } catch (err) {
    console.log(err.message);
    return sendResponse(res, 404, req, "DB error");
  }
};

// PUT methods for updating item, user, offer

const updateItem = async (req, res) => {
  const id = req.params.itemId;
  const userId = req.body.userId;
  const numOfSwaps = req.body.numOfSwaps;
  const batch = db.batch();
  const itemRef = db.collection("items").doc(id);
  batch.update(itemRef, { user: userId });
  batch.update(itemRef, { numOfSwaps: Number(numOfSwaps) });
  await batch.commit();
  return sendResponse(res, 200, req.body);
};
const updateUser = async (req, res) => {
  const id = req.params.userId;
  const numOfSwaps = req.body.numOfSwaps;
  const batch = db.batch();
  const userRef = db.collection("users").doc(id);
  batch.update(userRef, { numOfSwaps: Number(numOfSwaps) });
  await batch.commit();
  return sendResponse(res, 200, req.body);
};
const updateOffer = async (req, res) => {
  const id = req.params.offerId;
  const statusOffer = req.body.status;
  const batch = db.batch();
  const offerRef = db.collection("offers").doc(id);
  batch.update(offerRef, { status: statusOffer });
  await batch.commit();
  return sendResponse(res, 200, req.body);
};

// one update of all info

const updateInfo = async (req, res) => {
  console.log(req.body);
  const offerId = req.params.offerId;
  const bidderUser = req.body.bidderUser;
  const offereeUser = req.body.offereeUser;
  const itemBidder = req.body.itemBidder;
  const itemOfferee = req.body.itemOfferee;
  const numOfSwaps_itemBid = req.body.numOfSwaps_itemBid;
  const numOfSwaps_itemOff = req.body.numOfSwaps_itemOff;
  const numOfSwaps_userBid = req.body.numOfSwaps_itemBid;
  const numOfSwaps_userOff = req.body.numOfSwaps_itemOff;
  const statusOffer = req.body.status;
  const batch = db.batch();
  if (statusOffer === "accepted") {
    console.log("Start of update");
    const offerRef = db.collection("offers").doc(offerId);
    batch.update(offerRef, { status: statusOffer });

    const itemBidderRef = db.collection("items").doc(itemBidder);
    batch.update(itemBidderRef, { user: offereeUser });
    batch.update(itemBidderRef, { numOfSwaps: Number(numOfSwaps_itemBid) });

    const itemOffereeRef = db.collection("items").doc(itemOfferee);
    batch.update(itemOffereeRef, { user: bidderUser });
    batch.update(itemOffereeRef, { numOfSwaps: Number(numOfSwaps_itemOff) });

    const userBidderRef = db.collection("users").doc(bidderUser);
    batch.update(userBidderRef, { numOfSwaps: Number(numOfSwaps_userBid) });

    const userOffereeRef = db.collection("users").doc(offereeUser);
    batch.update(userOffereeRef, { numOfSwaps: Number(numOfSwaps_userOff) });
    console.log("End of update");
  }

  if (statusOffer === "rejected") {
    console.log("Reject!");
    const offerRef = db.collection("offers").doc(offerId);
    batch.update(offerRef, { status: statusOffer });
  }

  await batch.commit();
  return sendResponse(res, 200, req.body);
};

//GET all items that includes in there name searchItem
const getFullItemsInfo = async (items) => {
  const ids = items.map((item) => item.id);
  const db = firebase.firestore();
  const docsRef = db.collection("items");

  if (ids) {
    const snapshot = await docsRef.where("id", "in", ids).get();
    if (snapshot.empty) return [];
    else {
      const temp = [];
      snapshot.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      return temp;
    }
  }
  return [];
};
const searchItem = async (req, res) => {
  let searchResult = [];
  let searchItem = req.params.searchItem;
  console.log(searchItem);
  const docRef = db.collection("items");

  docRef
    .select("_id")
    .select("name")
    .get()
    .then(async (querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      console.log(temp);
      const searchResultTemp = searchForItem(temp, searchItem);
      searchResult = await getFullItemsInfo(searchResultTemp);
      console.log(searchResult);
      sendResponse(res, 200, searchResult);
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};

//DELETE item by id

const deleteItem = async (req, res) => {
  console.log("delete");
  const id = req.params.itemId;
  console.log(id);
  const db = firebase.firestore();
  const docRef = db.collection("items").doc(id);
  const result = await docRef.delete();
  sendResponse(res, 200, id);
};

//Sending mails
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log(process.env.SENDGRID_API_KEY);
const sendMail = (req, res) => {
  const recipient = req.body.emailRecipient;
  const sender = req.body.emailSender;
  const senderName = req.body.nameSender;
  const message = req.body.message;
  const msg = {
    to: recipient, // Change to your recipient
    from: "evgeniia.vyushkova@gmail.com", // Change to your verified sender
    subject: `You have new message from ${senderName} <${sender}>`,
    text: message,
    html: `<strong>${message}</strong>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  createUser,
  getItemById,
  getAllItems,
  addItem,
  getUserById,
  getItemsByUserId,
  getOffersByUserId,
  createOffer,
  updateUser,
  updateOffer,
  updateItem,
  updateInfo,
  searchItem,
  deleteItem,
  sendMail,
};
