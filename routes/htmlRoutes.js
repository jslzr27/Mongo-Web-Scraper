var db = require("../models");


module.exports = function(app){
    app.get("/", function(req, res) {
        res.render("index");
    });

    app.get("/article/id:", function(req, res){
        var id = req.params.id;

        db.Article.findById(id)
            .populate("comments")
            .sort({_id: -1})
            .then(function(results){
                console.log(results);
                res.render("comment", {results: results});
            })
            .catch(function(err){
                console.log(err);
            })
    })
}