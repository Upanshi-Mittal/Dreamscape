// db.js
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
require('dotenv').config();

const mongo_url =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_DEV;

mongoose.connect(mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const conn = mongoose.connection;

conn.on("error", (err) => console.error("MongoDB connection error:", err));

let gfs;
conn.once("open", () => {
  console.log("✅ MongoDB connected...");
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
});
const getGfs = () => gfs;

module.exports = { mongoose, conn, gfs };
