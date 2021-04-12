"use strict";

const express = require("express");
const morgan = require("morgan");

const { getUserById, getItemById } = require("./handlers");

const app = express();

app.use(morgan("tiny"));
app.use(express.json());

// endpoints

app.get("/users/:userId", getUserById);
app.get("/items/:itemId", getItemById);

app.listen(4000, () => console.log(`Listening on port 4000`));
