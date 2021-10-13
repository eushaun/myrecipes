const { Router } = require("express");
const userController = require("../controllers/userController");
const aws = require('../config').aws;
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new AWS.S3({
    accessKeyId: aws['ID'],
    secretAccessKey: aws['SECRET']
  });

const upload = multer({
  // CREATE MULTER-S3 FUNCTION FOR STORAGE
  storage: multerS3({
      s3: s3,
      acl: 'public-read',
      // bucket - WE CAN PASS SUB FOLDER NAME ALSO LIKE 'bucket-name/sub-folder1'
      bucket: `${aws['BUCKET']}/profile`,
      // META DATA FOR PUTTING FIELD NAME
      metadata: function (req, file, cb) {
          cb(null, { fieldName: file.fieldname });
      },
      // SET / MODIFY ORIGINAL FILE NAME
      key: function (req, file, cb) {
          cb(null, file.originalname); //set unique file name if you wise using Date.toISOString()
      }
  }),
  // SET DEFAULT FILE SIZE UPLOAD LIMIT
  limits: { fileSize: 1024 * 1024 * 2 }, // 2MB
});

const router = Router();

router.get("/", userController.getOne);

router.put("/", upload.single('myFile'), userController.editUser);

router.delete("/:uid([0-9]+)", userController.deleteUser);

router.post("/subscribe", userController.subscribe);

router.delete("/unsubscribe/:subid([0-9]+)/:conid([0-9]+)", userController.unsubscribe);

module.exports = router;
