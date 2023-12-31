const express = require("express");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3Controller = require("../controllers/s3Controller");
const { authenticate } = require("../middleware/authMiddleware");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

const BUCKET = process.env.BUCKET;

const upload = multer({
  storage: multerS3({
    s3: new aws.S3({
      secretAccessKey: process.env.ACCESS_SECRET,
      accessKeyId: process.env.ACCESS_KEY,
      region: process.env.REGION,
    }),
    acl: "public-read",
    bucket: BUCKET,
    key: function (req, file, cb) {
      console.log(file);
      cb(null, file.originalname); 
    },
  }),
});

router.post("/upload", authenticate, upload.single("file"), s3Controller.uploadFile);
router.get("/list", authenticate, s3Controller.listFiles);
router.get("/download/:filename", authenticate, s3Controller.downloadFile);
router.delete("/delete/:filename", authenticate, s3Controller.deleteFile);

module.exports = router;
