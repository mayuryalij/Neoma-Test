const aws = require("aws-sdk");
const dotenv = require("dotenv");
dotenv.config();

// Integrated AWS S3 for handling image uploads.

aws.config.update({
  secretAccessKey: process.env.ACCESS_SECRET,
  accessKeyId: process.env.ACCESS_KEY,
  region: process.env.REGION,
});

const BUCKET = process.env.BUCKET;
const s3 = new aws.S3();

exports.uploadFile = async (req, res, next) => {
  try {
    res.send("Successfully uploaded " + req.file.location + " location!");
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.listFiles = async (req, res) => {
  try {
    let r = await s3.listObjectsV2({ Bucket: BUCKET }).promise();
    let x = r.Contents.map((item) => item.Key);
    res.send(x);
  } catch (error) {
    console.error("Error listing files:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.downloadFile = async (req, res) => {
  try {
    const filename = req.params.filename;
    let x = await s3.getObject({ Bucket: BUCKET, Key: filename }).promise();
    res.send(x.Body);
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const filename = req.params.filename;
    await s3.deleteObject({ Bucket: BUCKET, Key: filename }).promise();
    res.send("File Deleted Successfully");
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).send("Internal Server Error");
  }
};
