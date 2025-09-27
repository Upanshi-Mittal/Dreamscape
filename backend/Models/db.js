// db.js
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
require('dotenv').config();

const mongo_url = process.env.MONGO_CONN;

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

module.exports = { mongoose, conn, gfs };
