const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const DatabaseHandler = require("../DatabaseHandler");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

function fileFilter(req, file, cb) {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
  //cb(new Error("I don't have a clue!"));
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.post("/upload", upload.single("image"), (req, res, next) => {
  console.log("uploaded file:", req.file, req.body);
  DatabaseHandler.getFile(req.file.originalname).then((file) => {
    if (file == undefined) {
      DatabaseHandler.insert(
        req.file.originalname,
        req.body.title || req.file.originalname,
        req.body.description || "",
        new Date().toISOString()
      );
    } else {
      console.log("file already exists");
    }
  });
  res.send();
});

router.get("/all", (req, res, next) => {
  DatabaseHandler.getAll().then((data) => {
    res.json(data);
  });
});

router.put("/", upload.none(), (req, res, next) => {
  DatabaseHandler.getFile(req.body.filename).then((file) => {
    console.log(req.body);
    if (file == undefined) {
      console.log("File to modify not found");
      res.send();
    }
    DatabaseHandler.updateFile(
      req.body.filename,
      req.body.title,
      req.body.description
    );

    res.send();
  });
});

router.delete("/", upload.none(), (req, res, next) => {
  DatabaseHandler.getFile(req.body.filename).then((file) => {
    console.log(req.body);
    if (file == undefined) {
      console.log("File to delete not found");
      res.send();
    }
    DatabaseHandler.removeFile(req.body.filename);
    fs.unlink("./uploads/" + req.body.filename, (err) => {
      if (err) console.log(err);
    });
    res.send();
  });
});

module.exports = router;
