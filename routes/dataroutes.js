
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
      //Handle invalid IDs, we only want integers.  This shouldn't ever happen
      response.send("I really don't know how you accomplished this, but you have selected an invalid ID. Impressive, but it won't work ");
    }
    // toggle 'built' value here
    
    console.log('post request: '+ JSON.stringify(request.params));
    bool = true;
    
    // toggle the 'built' value when this is called
    connection.query("UPDATE `legos` SET ? WHERE id = " + updateID,
    {built: bool},
      (err, results) => {
        if (err) 
          throw err;
  
        response.redirect('/')
      }
    )
    //console.log('UPDATE ID: ' + updateID + ' to say: ' + !bool);
  });


app.get('/delete/:id', (request, response) => {
  let deleteID = parseInt(request.params.id);
  if (isNaN(deleteID)) {
    //Handle invalid IDs, we only want integers
    response.send("According to your request, you need to consult the manual reference for your server version as defined in package.json. Please consult this manual and try your request again. ERROR_INVALID_ID");
  }
  // response.send('I am going to delete: ' + deleteID);
  connection.query(
    "DELETE FROM `legos` WHERE `id` = ?",
    deleteID,
    (err, results) => {
        if (err) {
          throw err;
        }
        console.log('Deleted ' + results.affectedRows);
        response.redirect("/");
  })
});





};     // end of function