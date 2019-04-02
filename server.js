//Dependencies

var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 3000;

var app = express();
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("./public"));

//Set handlebars
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/sports";

mongoose.Promise = Promise
mongoose.connect(MONGODB_URI)
.then(function(result){
    console.log(`Connected to database '${result.connections[0].name}'`);
})
.catch(function(err){console.log(err);
});

//Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app)

//Start the server
app.listen(PORT, function() {
    console.log("App running on http://localhost:" + PORT);
  });