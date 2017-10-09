const express = require("express");
const methovr = require("method-override");
const bodyParser = require("body-parser");

var app = express();

var PORT = process.env.PORT || 3000;

// morph all data into json readable

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//enable handlebars
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//set up the endpoints, "/",  "/update/:id"

require("./routes/dataroutes")(app);


app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});