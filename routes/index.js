var express = require("express");
var router = express.Router();
var request = require("request");
var cheerio = require("cheerio");
var mongojs = require("mongojs");
var Articles = require("../models/articles");

// Database configuration
var databaseUrl = "scraper";
var collections = ["newsdb"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index/index");
});

/* GET saved page */
router.get("/saved", function(req, res, next) {
  res.render("saved/saved", { title: "News-Scraper" });
});

/* GET scrape */
router.get("/scrape", function(req, res, next) {
  request("https://www.nytimes.com/", function(error, response, html) {
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);
    // For each element with a "title" class
    $("h2.story-heading").each(function(i, element) {
      // Save the text and href of each link enclosed in the current element
      var title = $(element)
        .children("a")
        .text();
      var link = $(element)
        .children("a")
        .attr("href");

      $("p.summary").each(function(i, element) {
        var summary = $(element)
          .children("a")
          .text();
      });

      // If this found element had both a title and a link
      if (title && link) {
        // Insert the data in the newsdb db
        db.newsdb.insert(
          {
            title: title,
            link: link
          },
          function(err, inserted) {
            if (err) {
              // Log the error if one is encountered during the query
              console.log(err);
            } else {
              // Otherwise, log the inserted data
              // console.log(inserted);
            }
          }
        );
      }
    });
  });


    res.render("index/index", {
      title: "News-Scraper",
      articles: db.newsdb
  });
});

module.exports = router;
