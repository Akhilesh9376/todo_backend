const mongoose = require('mongoose');
const { URL } = require('./serverConfig');

async function dbConnect() {
  try {
    console.log("Connection is going on..");
    await mongoose.connect(URL);
    console.log("DB Connection Successfull");
  } catch (error) {
    console.log("Error Occured", error);
  }
}

module.exports = dbConnect;