const mongoose = require("mongoose");

async function Connection(url) {
  mongoose
    .connect(url)
    .then(() => {
      console.log("Connected...");
    })
    .catch((err) => {
      console.log(err);
    });
}
module.exports = { Connection };
