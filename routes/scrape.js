var express = require("express");
var router = express.Router();
var Articles = require("../models/articles");

/* GET home page. */
router.get("/", function(req, res, next) {
  Articles.find(function(err, docs) {
    var articleChunks = [];
    var chunkSize = 3;

    for (var i = 0; i < docs.length; i+= chunkSize) {
      articleChunks.push(docs.slice(i, i + chunkSize));
    }

    res.render("index/index", { title: "News-Scraper", articles: articleChunks });
  });
});

/* GET saved page */
router.get("/saved", function(req, res, next) {
  res.render("saved/saved", { title: "News-Scraper"});
});

/* GET scrape */
// Scrape data from one site and place it into the mongodb db
router.get("/scrape", function(req, res) {

  });

module.exports = router;
