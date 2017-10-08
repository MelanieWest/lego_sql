
module.exports = function(app){

    var mysql = require("mysql");
    
    var connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "legos_db"
    });

connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });
  
  // Root get route; table name = 'legos'; single items = 'lego'
  
  app.get("/", function(req, res) {
    connection.query("SELECT * FROM legos;", function(err, data) {
      if (err) throw err;
      res.render("index", { legos: data, title: "All my projects"});
      console.log(data);
  
    }); //not sure about the details in the render line above
  });
  
  // // Post route -> back to home
  app.post("/", function(req, res) {
    // Test it
     console.log('You sent, ' + req.body.lego);
  
    // Test it
    // res.send('You sent, ' + req.body.lego);
  
     connection.query("INSERT INTO legos (lego) VALUES (?)", [req.body.lego], function(err, result) {
      if (err) throw err;
      
      res.redirect("/");
    });
  });

  app.post('/update/:id', (request, response) => {
    let updateID = parseInt(request.params.id);
    if (isNaN(updateID)) {
      //Handle invalid IDs, we only want integers
      response.send("According to your request, you need to consult the manual reference for your server version as defined in package.json. Please consult this manual and try your request again. ERROR_INVALID_ID");
    }
    // toggle 'built' value here
    connection.query("UPDATE `legos` SET ? WHERE id = " + updateID,
      {built: !request.body.built},
      (err, results) => {
        if (err) 
          throw err;
  
        response.redirect('/')
      }
    )
    console.log('UPDATE ID: ' + updateID + ' to say: ' + request.body.built);
  });
  
// app.post('/update/:id', (request, response) => {

//     let updateID = parseInt(request.params.id);

//     //toggle the boolean value of 'built' parameter
//     // the array index is one less than the id.

//     var bool = dataRender.data[updateID-1].built;
//     dataRender.data[updateID-1].built = !bool;

//     response.redirect('/')

//   });

};     // end of function