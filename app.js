const express = require("express");
const app = express();
var items = ["Buy food", "Cook a dish", "Have a meal"];
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');

app.get("/", function(req, res){
    var today = new Date();
    
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US", options);

    res.render("list", {kindofDay: day, newListItem: items});
});

app.post("/", function(req, res){
    var item = req.body.newItem;
    
    items.push(item);

    res.redirect("/");
});

app.listen(3000, function(){
    console.log("Server started on por 3000")
});