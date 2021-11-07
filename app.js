const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.KEY+"/linkShortnerDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

console.log("Connected to database!");

const linksSchema = new mongoose.Schema({
  shrt: String,
  original: String,
},
{
  writeConcern: {
    w: 'majority',
    j: true,
    wtimeout: 1000
  }
}
);

const Link = mongoose.model("link", linksSchema);



const arr = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

// Function for generating random string

function randomStr() {
  var ans = "";
  for (var i = 6; i > 0; i--) {
    ans += arr[Math.floor(Math.random() * arr.length)];
  }

  return ans;
}
let myu1 = [];

app.get("/", (req, res) => {
  res.render("home", { link: myu1 });
});

app.get("/about", (req, res) => {
  res.render("about");
});





app.get("/:shortId", (req, res) => {
  try {
    let shortId = req.params.shortId;
    Link.find((err, links) => {
      if (err) {
        console.log(err);
      } else {
        for (let i = 0; i < links.length; i++) {
          if (links[i].shrt === shortId) {
              
              let url=links[i].original;
              if(url.substring(0,8)!="https://"){
                url="https://"+url;
              }
            res.redirect(url);
            break;
          }
        }
      }
    });
  }


  catch (err) {
      console.log(err);
    res.render("error");
  }
});



app.post("/", (req, res) => {
  
  try {
    var parentLink = req.body.parentLink;
    let randstr=randomStr();
    let srtlink = new Link({ shrt:randstr , original: parentLink });

    srtlink.save((err,report)=>{
      if(err){
        console.log("error while saving");
      }
      else{
      
        res.render("home", { link: [report] });
      }
    });
    
    
    // Link.find((err,links)=>{
      // console.log("haha"+fu);

      // if (err) {
      //   console.log("Got error while saving the links to the database!");
      //   res.render("home", { link: myu1 });
      // } else {
        // let linkList=[links]
        // console.log(links);
        
      // }

    // })


    // Link.find((err, links) => {
      
    // });
  } catch (err) {
      console.log(err);
    console.log("Reached catch section!");
    res.render("home", { link: myu1 });
  }
});



app.listen(process.env.PORT || 3000, () => {
  console.log("Server started at port! " + process.env.PORT);
});
