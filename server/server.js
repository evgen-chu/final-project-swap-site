"use strict";

const express = require("express");
const morgan = require("morgan");
const multer = require("multer");

const {
  createUser,
  getItemById,
  getAllItems,
  addItem,
  getUserById,
  getItemsByUserId,
  createOffer,
  getOffersByUserId,
  updateOffer,
  updateUser,
  updateItem,
  updateInfo,
  searchItem,
} = require("./handlers");

require("dotenv").config();

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.static("./client/build"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("tiny"));
app.use(express.json());

// endpoints
app.post("/users", createUser);
//app.get("/users/:userId", getUserById);
app.get("/getitems", getAllItems);
app.get("/users/:userId/items", getItemsByUserId);
app.get("/items/:itemId", getItemById);
app.put("/items/:itemId/update", updateItem);
app.get("/users/:userId", getUserById);
app.put("/users/:userId/update", updateUser);

//endpoint for checking new offers
app.get("/offers/:userId", getOffersByUserId);
app.put("/offers/:offerId/update", updateOffer);

app.get("/searchItem/:searchItem", searchItem);

const upload = multer({ storage: multer.memoryStorage() });
//endpoint for creating new offer
app.post("/offers/addOffer", upload.none(), createOffer);

app.post("/items/addItem", upload.single("file"), addItem);

app.put("/updateInfo/:offerId", upload.none(), updateInfo);

app.listen(4000, () => console.log(`Listening on port 4000`));
