var legoData = require("../data/legoData.js");

module.exports = function(app){

    var dataRender = {data:legoData};
    var dataArray  = JSON.stringify(legoData);

    app.get("/",function(req,res){
       
        //res.json(legoData);
        console.log('app.get');

        //why is this here?  it seems to only disply stuff to console
        //if the array has items in it

        if(!legoData.length){
            dataArray = JSON.stringify(legoData)
            console.log('lego data seen by get: '+ dataArray);
        }
        
        res.render("index", dataRender);
 
});     //end of get


    app.post("/", function(req, res) {

        console.log('app.post')
        console.log(req.body.object);

        //if data was entered:

        if(req.body.object){

        //set data values for insertion into object array
        req.body.built = false;     //it was reading as a string
        req.body.id = (legoData.length)+1;    //array length viewable here

        var lego = {
            id:  legoData.length +1,
            object:  req.body.object,
            built:  false
        };

        //if the previous object is blank (always true for the first
        //object), replace it with the current object

        if (legoData[(legoData.length-1)].object ==""){
            lego.id = legoData.length;
            legoData[(legoData.length-1)] = lego;
        }else{
            //legoData.push(req.body);
            legoData.push(lego);
        }
      
        dataArray = JSON.stringify(legoData)
        console.log('lego array seen by post: '+ dataArray);

        res.redirect("/");
    };
        return;

      }); //end of post


app.get("/api/legos",function(req,res){
        //console.log(req.body);
        res.send(legoData);
        
});


app.post('/update/:id', (request, response) => {

    let updateID = parseInt(request.params.id);

    //toggle the boolean value of 'built' parameter
    // the array index is one less than the id.

    var bool = dataRender.data[updateID-1].built;
    dataRender.data[updateID-1].built = !bool;

    response.redirect('/')

  });

};     // end of function