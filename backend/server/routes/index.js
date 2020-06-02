import express from "express";
var router = express.Router();

/* GET server page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Server" });
});

module.exports = router;
