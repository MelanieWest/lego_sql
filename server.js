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


// app.get('/delete/:id', (request, response) => {
//   let deleteID = parseInt(request.params.id);
//   if (isNaN(deleteID)) {
//     //Handle invalid IDs, we only want integers
//     response.send("According to your request, you need to consult the manual reference for your server version as defined in package.json. Please consult this manual and try your request again. ERROR_INVALID_ID");
//   }
//   // response.send('I am going to delete: ' + deleteID);
//   connection.query(
//     "DELETE FROM `legos` WHERE `id` = ?",
//     deleteID,
//     (err, results) => {
//         if (err) {
//           throw err;
//         }
//         console.log('Deleted ' + results.affectedRows);
//         response.redirect("/");
//   })
// });




//----------above was added from 7.4 #07 task saver ----------------- 



app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});