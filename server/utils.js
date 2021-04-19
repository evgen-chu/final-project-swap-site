const sendResponse = (res, status, data, message = "No message included.") => {
  return res.status(status).json({ status, data, message });
};

const searchForItem = (modal, searchItem) => {
  const searchResults = modal.filter((item) => {
    console.log(item.name, searchItem);
    return item.name.toLowerCase().includes(searchItem.toLowerCase());
  });
  return searchResults;
};

const paginatedResults = (req, model) => {
  const page = req.query.page;
  const limit = req.query.limit;

  if (page && limit) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let resultItems = model.slice(startIndex, endIndex);
    return resultItems;
  } else return model;
};

const getRandomSample = (model, size) => {
  let shuffled = model.slice(0);
  let i = model.length;
  let min = i - size;
  let temp;
  let index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
};
module.exports = { sendResponse, searchForItem, paginatedResults };
