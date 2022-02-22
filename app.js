const express = require("express");
const app = express();
const mongoose = require("mongoose");
const _ = require("lodash");

app.use(express.urlencoded({ extended: true }))
//Static files are files that clients download as they are from the server. 
//Create a new directory, public. Express, by default does not allow you to serve static files.
//You need to enable it using the following built-in middleware:
app.use(express.static("public"));

app.set('view engine', 'ejs');

//Connect to MongoDB w/ Mongoose
mongoose.connect("mongodb+srv://admin-luke:test123@cluster0.gbas0.mongodb.net/todolistDB");

//Create a schema
const itemsSchema = new mongoose.Schema ({
    name: {
        type: String,
    }
})

//Create a model
const Item = mongoose.model("Item", itemsSchema)

//Create some default documents
const item1 = new Item ({
    name: "Welcome to your todolist!"
})

const item2 = new Item ({
    name: "Hit the '+' button to add a new item."
})

const item3 = new Item ({
    name: "← Hit this to delete an item."
})

const defaultItems = [item1, item2, item3];

const listSchema = {
    name: String,
    items: [itemsSchema]
}

const List = mongoose.model("List", listSchema);

//Create/access the main list
app.get("/", function(req, res){
    //Find and print all documents
    Item.find({}, function(err, foundItems){
        if(foundItems.length === 0){
            //Insert all default documents into a collection
            Item.insertMany(defaultItems, function(err){
                if(err){
                    console.log(err);
                } else {
                    console.log("Successfully saved all documents.");
                }
            })
            res.redirect("/");
        } else {
            res.render("list", {listTitle: "Today", newListItems: foundItems});
        }
    })
});

//Create/access custom lists
app.get("/:customListName", function(req, res){
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({name: customListName}, function(err, foundList){
        if(!err){
            if(!foundList){
                //Create a new list
                const list = new List({
                    name: customListName,
                    items: defaultItems
                })
                list.save();
                res.redirect("/" + customListName);
            } else {
                //Show an existing list
                res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
            }
        }
    })
})

//Add content to the main todo list
app.post("/", function(req, res){

    const itemName = req.body.newItem;
    const listName = req.body.list;
  
    const item = new Item({
      name: itemName
    });
  
    if (listName === "Today"){
      item.save();
      res.redirect("/");
    } else {
      List.findOne({name: listName}, function(err, foundList){
        foundList.items.push(item);
        foundList.save();
        res.redirect("/" + listName);
      });
    }
  });

//Delete content from the main todo list
app.post("/delete", function(req, res){
   const checkedItemId = req.body.checkbox;
   const listName = req.body.listName;

   if(listName === "Today"){
   Item.findByIdAndRemove(checkedItemId, function(err){
       if(err){
           console.log(err);
       } else {
           console.log("Successfully deleted the document.");
       }
   })

   res.redirect("/");
   } else {
       List.findOneAndUpdate(
           {name: listName},
           {$pull: {items: {_id: checkedItemId}}},
           function(err, foundList){
               if(!err){
                   res.redirect("/" + listName);
               }
           }
       )
   }
});

//Start the server

let port = process.env.PORT;
if (port == null || port == ""){
    port = 3000;
}

app.listen(port, function(){
    console.log("Server started on por 3000")
});