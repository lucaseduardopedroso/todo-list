const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');

app.get("/", function(req, res){
    var today = new Date();
    var currentDay = today.getDay();
    var day = "";

    if (currentDay === 1){
        day = "Monday";
    } else if (currentDay === 2){
        day = "Tuesday";
    } else if (currentDay === 3){
        day = "Wednesday";
    } else if (currentDay === 4){
        day = "Thursday";
    } else if (currentDay === 5){
        day = "Friday";
    } else if (currentDay === 6){
        day = "Saturday";
    } else {
        day = "Sunday";
    }

    res.render("list", {kindofDay: day});
});

app.listen(3000, function(){
    console.log("Server started on por 3000")
});