const express = require('express');
const multer = require('multer');
const { conn, gfs } = require("./Models/db");
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();
console.log("MONGO_CONN from .env:", process.env.MONGO_CONN);
const path = require('path');

const app = express();
const Port = process.env.PORT || 8080;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(session({
  secret: 'JWT_SECRET',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ping route for testing
app.get('/pin', (req, res) => {
  res.send("PONG");
});

let upload;  // multer instance placeholder

conn.once('open', () => {
  console.log("MongoDB connection is open");

  // Create GridFS storage after DB connection is ready
  const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder to store uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // unique filename
  }
});

  upload = multer({ storage });

  // Define your upload route here or after multer is initialized
  app.post('/upload-photo', upload.single('photo'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    res.status(200).json({
      message: 'Photo uploaded successfully',
      file: req.file,
    });
  });
});

// Your other routes
app.use('/auth', require("./router/authroute"));
app.use('/products', require("./router/productRouter"));

app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});
