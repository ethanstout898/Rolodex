const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");
require('dotenv').config()

const app = express();

mongoose.set("strictQuery", false);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin:"+process.env.DB_PASSWORD+"@"+process.env.CLUSTER+".mongodb.net/"+process.env.DB_NAME, {useNewUrlParser: true});

const contactsSchema = mongoose.Schema({
    name: String,
    business: String,
    number: String,
    occupation: String,
    comments: String
});

const Contact = mongoose.model("contact", contactsSchema);

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    Contact.find({})
    .then((foundContacts) => {
        
          res.render("list", {listTitle: "Contacts", newListContacts: foundContacts, faId: process.env.FA_ID});
        })
    .catch((err) => {
        console.log(err);
    });
});

app.post("/", function(req, res){

    const contactName = req.body.newName;
    const contactBusiness = req.body.newBusiness;
    const contactNumber = req.body.newNumber;
    const contactOccupation = req.body.newOccupation;
    const contactComments = req.body.newComments;
    const listName = req.body.list;
  
    const contact = new Contact({
      name: contactName,
      business: contactBusiness,
      number: contactNumber,
      occupation: contactOccupation,
      comments: contactComments
    });
  
    if(listName === "Contacts") {
      contact.save();
      res.redirect("/update");
    } else {
      List.findOne({name: listName})
     .then((foundList) => {
        foundList.contacts.push(contact);
        foundList.save();
        res.redirect("/update" + listName);
      })
      .catch((err) => {
        console.log(err)
      });
    }
    
  });

app.get("/update", function(req, res) {
  Contact.find({})
    .then((foundContacts) => {
        
          res.render("add", {listTitle: "Contacts", newListContacts: foundContacts, faId: process.env.FA_ID});
        })
    .catch((err) => {
        console.log(err);
    });
})

app.post("/delete", function(req, res) {
const checkedContactId = req.body.checkbox;
const listName = req.body.listName; 

    if(listName === "Contacts") {
        Contact.findByIdAndDelete(checkedContactId)
        .catch((err) => {
            console.log(err);
        });
        res.redirect("/update");
    } else {
        List.findOneAndUpdate({name: listName}, {$pull: {contactss: {_id: checkedContactId}}}, function(err, foundList) {
        res.redirect("/update" + listName);
        });
    }
});

app.listen("3000", function() {
    console.log("Server has started on port 3000");
});