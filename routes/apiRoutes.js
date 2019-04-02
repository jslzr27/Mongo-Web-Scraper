var db = require("../models");
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function(app) {
    app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with axios
        axios.get("http://www.si.com/").then(function(response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);

            // Now, we grab every h2 within an article tag, and do the following:
            $("article div.headline").each(function(i, element) {
                //sae an empty result object
                var result = {};

                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this)
                    .children("a")
                    .text();
                result.link = $(this)
                    .children("a")
                    .attr("href");

                // Create a new Article using the `result` object built from scraping
                db.Article.create(result)
                    .then(function(response){
                        console.log(response);
                    })
                    .catch(function(err){
                        console.log(err);
                    });
            });
        //Send a message to the client
        res.send("Scrape complete");
        });
});
}