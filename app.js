const express = require("express");
const app = express();
let items = [];
let workItems = [];

app.use(express.urlencoded({ extended: true }))
//Static files are files that clients download as they are from the server. 
//Create a new directory, public. Express, by default does not allow you to serve static files.
//You need to enable it using the following built-in middleware:
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", function(req, res){
    let today = new Date();
    
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);

    res.render("list", {listTittle: day, newListItem: items, route: "/"});
});

app.get("/work", function(req, res){
    res.render("list", {listTittle: "Work List", newListItem: workItems, route: "/work"});
});

app.post("/", function(req, res){
    let item = req.body.newItem;
    
    items.push(item);

    res.redirect("/");
});

app.post("/work", function(req, res){
    let item = req.body.newItem;
    
    workItems.push(item);

    res.redirect("/work");
});


app.listen(3000, function(){
    console.log("Server started on por 3000")
});