var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Create article schema
var ArticleSchema = new Schema({
    // title is a required string
    title: {
      type: String,
      required: true
    },
    // link is a required string
    link: {
      type: String,
      required: true
    },
    summary: {
      type: String,
    },
    // This only saves one comment's ObjectId, ref refers to the Comment model
    comments: [{
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }]
  });

  var Article = mongoose.model("Article", ArticleSchema);

  module.exports = Article;