const express=require( 'express');
const likes=require( './likes');
const comments=require( './comments');
const multer=require('multer');
const router = express.Router();
const { blogmodel }=require( "../Models/user");
const auth= require( '../Middlewares/auth');
const Add=require( './add');
const Blog=require( './bloggssss');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    cb(null, `photo_${Date.now()}.${ext}`);
  }
});
const upload = multer({ storage });
router.post('/add', auth, upload.single('pic'),Add);
router.get('/blog', auth, Blog);
router.post('/:id/like', auth, likes);
router.post('/:id/comments', auth,comments);
module.exports = router;