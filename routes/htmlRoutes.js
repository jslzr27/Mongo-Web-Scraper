var db = require("../models/index.js");


module.exports = function(app){
    app.get("/", function(req, res) {
        db.Article.find()
            .populate("comments")
            .sort({_id: -1})
            .then(function(results){
                res.render("index", {results: results});
            })
            .catch(function(err){
                console.log(err);
            })
    })
}