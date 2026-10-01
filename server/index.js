const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./UserSchema");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8080;

// Connect to MongoDB

mongoose
  .connect("mongodb://127.0.0.1:27017/college")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define a simple route
app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then((user) => {
      res.status(201).json({ message: "User register Successfully", user });
    })
    .catch((error) => {
      console.error("error Registry User", error);
      res.status(500).json({ message: "error registry User ", error });
    });
});

app.post("/login", (req, res) => {
  const {email , password} = req.body
  UserModel.findOne({email})
  .then((user)=>{
    if(!user){
      res.status(404).json({message:"User Not Found"})
    }
    if(user.password === password){
      res.status(200).json({message:"User Login Successfully"})
    }
    else {
      res.status(401).json({message:"invalid Credential"})
    }
  })
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
