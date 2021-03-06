
module.exports = function(app){

    var mysql = require("mysql");
    
    var connection;

    if (process.env.JAWSDB_URL){
      //Heroku deployment
      connection = mysql.createConnection(process.env.JAWSDB_URL);
    } 
    else{
      connection = mysql.createConnection({
      host: "localhost",
      user: "root",
//      password: "root",
      password: "",
      database: "legos_db"
    });
  }
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
     // console.log(data);
  
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

  app.post('/update/:id/:built', (request, response) => {
    let updateID = parseInt(request.params.id);
    if (isNaN(updateID)) {
      //Handle invalid IDs, we only want integers.  This shouldn't ever happen
      response.send("I really don't know how you accomplished this, but you have selected an invalid ID. Impressive, but it won't work ");
    }
    
    //toggle 'built' value here
    //console.log('post request: '+ JSON.stringify(request.params));
    
    var bool = parseInt(request.params.built);

    console.log('boolean: '+bool+', not boolean: '+!bool);

    connection.query("UPDATE `legos` SET ? WHERE id = " + updateID,
    {built: !bool},
      (err, results) => {
        if (err) 
          throw err;
  
        response.redirect('/')
        
      }
    )
   
  });


  app.get('/delete/:id', (request, response) => {
    let deleteID = parseInt(request.params.id);
    if (isNaN(deleteID)) {
      //Handle invalid IDs, we only want integers
      response.send("You are a hacker. You entered an invalid id, though that shouldn't be possible");
    }

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


  app.post('/change/:id', (request, response) => {
    console.log(request);
    let updateID = parseInt(request.params.id);
    if (isNaN(updateID)) {
      //Handle invalid IDs, we only want integers
      response.send("ERROR_INVALID_ID");
    }
    connection.query("UPDATE `legos` SET ? WHERE id = " + updateID,
      {lego: request.body.lego},
      (err, results) => {
        if (err) 
          throw err;
  
        response.redirect('/')
      }
    )
    console.log('UPDATE ID: ' + updateID + ' to say: ' + request.body.task);
  });

};     // end of function