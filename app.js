const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");
require('dotenv').config()

const app = express();

var RateLimit = require('express-rate-limit');
var limiter = RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

mongoose.set("strictQuery", false);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(limiter);

mongoose.connect("mongodb+srv://admin:"+process.env.DB_PASSWORD+"@"+process.env.CLUSTER+".mongodb.net/"+process.env.DB_NAME);

const contactsSchema = mongoose.Schema({
    yard: String,
    name: String,
    business: String,
    number: String,
    occupation: String,
    comments: String
});

const Contact = mongoose.model("contact", contactsSchema);

app.set("view engine", "ejs");

app.get("/7802", function(req, res) {
    Contact.find({yard: "7802"})
    .then((foundContacts) => {
        
          res.render("list", {listTitle: "Contacts", newListContacts: foundContacts, faId: process.env.FA_ID});
        })
    .catch((err) => {
        console.log(err);
    });
});

app.post("/7802", function(req, res){

    const contactYard = req.body.newYard;
    const contactName = req.body.newName;
    const contactBusiness = req.body.newBusiness;
    const contactNumber = req.body.newNumber;
    const contactOccupation = req.body.newOccupation;
    const contactComments = req.body.newComments;
    const listName = req.body.list;
  
    const contact = new Contact({
      yard: contactYard,
      name: contactName,
      business: contactBusiness,
      number: contactNumber,
      occupation: contactOccupation,
      comments: contactComments
    });
  
    if(listName === "Contacts") {
      contact.save();
      res.redirect("/7802update");
    } else {
      List.findOne({name: listName})
     .then((foundList) => {
        foundList.contacts.push(contact);
        foundList.save();
        res.redirect("/7802update" + listName);
      })
      .catch((err) => {
        console.log(err)
      });
    }
    
  });

app.get("/7802update", function(req, res) {
  Contact.find({yard: "7802"})
    .then((foundContacts) => {
        
          res.render("add7802", {listTitle: "Contacts", newListContacts: foundContacts, faId: process.env.FA_ID});
        })
    .catch((err) => {
        console.log(err);
    });
})

app.post("/7802delete", function(req, res) {
const checkedContactId = req.body.checkbox;
const listName = req.body.listName; 

if (typeof checkedContactId !== "string") {
  res.status(400).json({ status: "error", message: "Invalid item ID" });
  return;
}

    if(listName === "Contacts") {
        Contact.findByIdAndDelete(checkedContactId)
        .catch((err) => {
            console.log(err);
        });
        res.redirect("/7802update");
    } else {
        List.findOneAndUpdate({name: listName}, {$pull: {contacts: {_id: {$eq: checkedContactId}}}}, () => {
            res.redirect("/7802update" + listName);
          });
    }
});

app.get("/3214", function(req, res) {
    Contact.find({yard: "3214"})
    .then((foundContacts) => {
        
          res.render("list", {listTitle: "Contacts", newListContacts: foundContacts, faId: process.env.FA_ID});
        })
    .catch((err) => {
        console.log(err);
    });
});

app.post("/3214", function(req, res){

    const contactYard = req.body.newYard;
    const contactName = req.body.newName;
    const contactBusiness = req.body.newBusiness;
    const contactNumber = req.body.newNumber;
    const contactOccupation = req.body.newOccupation;
    const contactComments = req.body.newComments;
    const listName = req.body.list;
  
    const contact = new Contact({
      yard: contactYard,
      name: contactName,
      business: contactBusiness,
      number: contactNumber,
      occupation: contactOccupation,
      comments: contactComments
    });
  
    if(listName === "Contacts") {
      contact.save();
      res.redirect("/3214update");
    } else {
      List.findOne({name: listName})
     .then((foundList) => {
        foundList.contacts.push(contact);
        foundList.save();
        res.redirect("/3214update" + listName);
      })
      .catch((err) => {
        console.log(err)
      });
    }
    
  });

app.get("/3214update", function(req, res) {
  Contact.find({yard: "3214"})
    .then((foundContacts) => {
        
          res.render("add3214", {listTitle: "Contacts", newListContacts: foundContacts, faId: process.env.FA_ID});
        })
    .catch((err) => {
        console.log(err);
    });
})

app.post("/3214delete", function(req, res) {
const checkedContactId = req.body.checkbox;
const listName = req.body.listName; 

if (typeof checkedContactId !== "string") {
  res.status(400).json({ status: "error", message: "Invalid item ID" });
  return;
}

    if(listName === "Contacts") {
        Contact.findByIdAndDelete(checkedContactId)
        .catch((err) => {
            console.log(err);
        });
        res.redirect("/3214update");
    } else {
        List.findOneAndUpdate({name: listName}, {$pull: {contacts: {_id: {$eq: checkedContactId}}}}, () => {
            res.redirect("/3214update" + listName);
          });
    }
});

app.get("/3222", function(req, res) {
    Contact.find({yard: "3222"})
    .then((foundContacts) => {
        
          res.render("list", {listTitle: "Contacts", newListContacts: foundContacts, faId: process.env.FA_ID});
        })
    .catch((err) => {
        console.log(err);
    });
});

app.post("/3222", function(req, res){

    const contactYard = req.body.newYard;
    const contactName = req.body.newName;
    const contactBusiness = req.body.newBusiness;
    const contactNumber = req.body.newNumber;
    const contactOccupation = req.body.newOccupation;
    const contactComments = req.body.newComments;
    const listName = req.body.list;
  
    const contact = new Contact({
      yard: contactYard,
      name: contactName,
      business: contactBusiness,
      number: contactNumber,
      occupation: contactOccupation,
      comments: contactComments
    });
  
    if(listName === "Contacts") {
      contact.save();
      res.redirect("/3222update");
    } else {
      List.findOne({name: listName})
     .then((foundList) => {
        foundList.contacts.push(contact);
        foundList.save();
        res.redirect("/3222update" + listName);
      })
      .catch((err) => {
        console.log(err)
      });
    }
    
  });

app.get("/3222update", function(req, res) {
  Contact.find({yard: "3222"})
    .then((foundContacts) => {
        
          res.render("add3222", {listTitle: "Contacts", newListContacts: foundContacts, faId: process.env.FA_ID});
        })
    .catch((err) => {
        console.log(err);
    });
})

app.post("/3222delete", function(req, res) {
const checkedContactId = req.body.checkbox;
const listName = req.body.listName; 

if (typeof checkedContactId !== "string") {
  res.status(400).json({ status: "error", message: "Invalid item ID" });
  return;
}

    if(listName === "Contacts") {
        Contact.findByIdAndDelete(checkedContactId)
        .catch((err) => {
            console.log(err);
        });
        res.redirect("/3222update");
    } else {
        List.findOneAndUpdate({name: listName}, {$pull: {contacts: {_id: {$eq: checkedContactId}}}}, () => {
            res.redirect("/3222update" + listName);
          });
    }
});

app.get("/3209", function(req, res) {
    Contact.find({yard: "3209"})
    .then((foundContacts) => {
        
          res.render("list", {listTitle: "Contacts", newListContacts: foundContacts, faId: process.env.FA_ID});
        })
    .catch((err) => {
        console.log(err);
    });
});

app.post("/3209", function(req, res){

    const contactYard = req.body.newYard;
    const contactName = req.body.newName;
    const contactBusiness = req.body.newBusiness;
    const contactNumber = req.body.newNumber;
    const contactOccupation = req.body.newOccupation;
    const contactComments = req.body.newComments;
    const listName = req.body.list;
  
    const contact = new Contact({
      yard: contactYard,
      name: contactName,
      business: contactBusiness,
      number: contactNumber,
      occupation: contactOccupation,
      comments: contactComments
    });
  
    if(listName === "Contacts") {
      contact.save();
      res.redirect("/3209update");
    } else {
      List.findOne({name: listName})
     .then((foundList) => {
        foundList.contacts.push(contact);
        foundList.save();
        res.redirect("/3209update" + listName);
      })
      .catch((err) => {
        console.log(err)
      });
    }
    
  });

app.get("/3209update", function(req, res) {
  Contact.find({yard: "3209"})
    .then((foundContacts) => {
        
          res.render("add3209", {listTitle: "Contacts", newListContacts: foundContacts, faId: process.env.FA_ID});
        })
    .catch((err) => {
        console.log(err);
    });
})

app.post("/3209delete", function(req, res) {
const checkedContactId = req.body.checkbox;
const listName = req.body.listName; 

if (typeof checkedContactId !== "string") {
  res.status(400).json({ status: "error", message: "Invalid item ID" });
  return;
}

    if(listName === "Contacts") {
        Contact.findByIdAndDelete(checkedContactId)
        .catch((err) => {
            console.log(err);
        });
        res.redirect("/3209update");
    } else {
        List.findOneAndUpdate({name: listName}, {$pull: {contacts: {_id: {$eq: checkedContactId}}}}, () => {
            res.redirect("/3209update" + listName);
          });
    }
});

app.get("/2504", function(req, res) {
    Contact.find({yard: "2504"})
    .then((foundContacts) => {
        
          res.render("list", {listTitle: "Contacts", newListContacts: foundContacts, faId: process.env.FA_ID});
        })
    .catch((err) => {
        console.log(err);
    });
});

app.post("/2504", function(req, res){

    const contactYard = req.body.newYard;
    const contactName = req.body.newName;
    const contactBusiness = req.body.newBusiness;
    const contactNumber = req.body.newNumber;
    const contactOccupation = req.body.newOccupation;
    const contactComments = req.body.newComments;
    const listName = req.body.list;
  
    const contact = new Contact({
      yard: contactYard,
      name: contactName,
      business: contactBusiness,
      number: contactNumber,
      occupation: contactOccupation,
      comments: contactComments
    });
  
    if(listName === "Contacts") {
      contact.save();
      res.redirect("/2504update");
    } else {
      List.findOne({name: listName})
     .then((foundList) => {
        foundList.contacts.push(contact);
        foundList.save();
        res.redirect("/2504update" + listName);
      })
      .catch((err) => {
        console.log(err)
      });
    }
    
  });

app.get("/2504update", function(req, res) {
  Contact.find({yard: "2504"})
    .then((foundContacts) => {
        
          res.render("add2504", {listTitle: "Contacts", newListContacts: foundContacts, faId: process.env.FA_ID});
        })
    .catch((err) => {
        console.log(err);
    });
})

app.post("/2504delete", function(req, res) {
const checkedContactId = req.body.checkbox;
const listName = req.body.listName; 

if (typeof checkedContactId !== "string") {
  res.status(400).json({ status: "error", message: "Invalid item ID" });
  return;
}

    if(listName === "Contacts") {
        Contact.findByIdAndDelete(checkedContactId)
        .catch((err) => {
            console.log(err);
        });
        res.redirect("/2504update");
    } else {
        List.findOneAndUpdate({name: listName}, {$pull: {contacts: {_id: {$eq: checkedContactId}}}}, () => {
            res.redirect("/2504update" + listName);
          });
    }
});

app.listen("8000", () =>  {
    console.log("Server has started on port 8000");
});
