const { sendResponse } = require("./utils");
const users = require("./users.json");
const items = require("./items.json");
var admin = require("firebase-admin");

var serviceAccount = require("C:\\Users\\eugen\\Documents\\concordia-bootcamps\\final-project\\fp-swap-site\\server\\swap-app-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// GET user by id
const getUserById = async (req, res) => {
  const db = admin.firestore();
  const docRef = db.collection("users").doc("alovelace");
  console.log("ahahhaahah");
  await docRef.set({
    first: "Ada",
    last: "Lovelace",
    born: 1815,
  });
  const userId = params.userId;
  const user = users.find((user) => user._id === userId);
  return sendResponse(res, 200, user);
};

//GET item by id
const getItemById = (req, res) => {
  const itemId = params.itemId;
  const item = items.find((item) => item._id === itemId);
  return sendResponse(res, 200, user);
};

module.exports = { getUserById, getItemById };
