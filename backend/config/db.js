const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://username:password@course.fzupw.mongodb.net/dbname?retryWrites=true&w=majority"
    );
    // console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    // console.log(`Error:${err.message}`)
    process.exit(1);
  }
};

module.exports = connectDB;

/* eslint linebreak-style: ["error", "windows"] */
