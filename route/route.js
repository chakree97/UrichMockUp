const express = require('express');
const upload = require('../config/multer');
const router = express.Router();
const streamimageController = require("../img/streamimage")
const queryproductController = require("../controller/product/queryproduct");
const insertproductController = require("../controller/product/insertproduct")
const querytypeController = require("../controller/type/querytype")
const inserttypeController = require("../controller/type/inserttype")
const querycontentController = require("../controller/content/querycontent")
const insertcontentController = require("../controller/content/insertcontent")
const flashsaletimerConttroller = require("../controller/content/flashsale")

router.get('/img/:image',streamimageController.streamimage);

router.post("/createtype",upload.array('image',10),inserttypeController.insertType)
router.post("/createcontent",insertcontentController.insertContent);

router.get("/product/getproduct/:id",queryproductController.queryProduct,queryproductController.queryProductImage,queryproductController.queryProductReview);
router.post("/product/addproduct",upload.array('image',10),insertproductController.insertProduct,insertproductController.insertProductImage);

router.get("/type/getproduct/:type",querytypeController.queryProducttype);
router.post("/type/addproduct",inserttypeController.insertProducttype);

router.get("/content/queryproduct",querycontentController.queryBanner,querytypeController.queryalltype,querycontentController.queryFlashsale,querycontentController.queryContent);
router.post("/content/addproduct",insertcontentController.insertProductcontent);

router.patch("/flashsaletimer",flashsaletimerConttroller.editflashsale);



module.exports = router;