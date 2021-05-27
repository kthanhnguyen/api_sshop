const express = require('express');
const router = express.Router();

const uploadFile = require("../middlewares/uploadImage");

const FileController = require("../controller/file.controller");

router.post("/upload",uploadFile.single('file'), FileController.upload);

router.get("/files", FileController.getListFiles);

router.get("/files/:name", FileController.view);

module.exports = router;