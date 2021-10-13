const { Router } = require("express");
const recipeController = require("../controllers/recipeController");
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
    bucket: `${aws['BUCKET']}/recipe`,
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

/** RECIPES */

router.get("/", recipeController.getAll);

router.get("/recommended", recipeController.getRecommended);

router.get("/recommended-feed", recipeController.getRecommendedFeed);

router.get("/search", recipeController.searchRecipe);

router.get("/full", recipeController.getFullRecipe);

router.get("/contributor-recipe", recipeController.getFullRecipeToEdit);

router.get("/contributor", recipeController.getContributorRecipes);


router.post("/", recipeController.createRecipe);

router.post('/upload', upload.single("myFile"), recipeController.uploadImages);

router.post('/uploadSteps', upload.array("myFiles"), recipeController.uploadSteps);


router.post("/steps", recipeController.addRecipeSteps);


router.put("/details", recipeController.editRecipeDetails);

router.put("/steps", recipeController.editRecipeSteps);



router.delete("/:rid([0-9]+)", recipeController.deleteRecipe);

router.delete("/steps/:sid([0-9]+)", recipeController.deleteRecipeSteps);



/** LIKES */

router.post("/like", recipeController.likeRecipe);

router.delete("/unlike/:uid([0-9]+)/:rid([0-9]+)", recipeController.unlikeRecipe);


module.exports = router;
