const express= require("express");
const mongoose = require("mongoose");
const fileUpload=require("express-fileupload")
const app = express();
const dotenv = require("dotenv");
const authRoute = require("./api/routes/auth")
const userRoute = require("./api/routes/user")
const postRoute = require("./api/routes/post")
const catRoute = require("./api/routes/categories");
const path = require("path");
const cors = require("cors");
app.use(express.json())
app.use(fileUpload())
app.use(cors()); 
dotenv.config(); 

app.get("/", (req, res) =>{
  res.send("HEllo Bachooo..")
});

mongoose.connect(process.env.MONGO_URL)
.then(console.log("Connencted to DB"))
.catch((err) => console.log(err.message))

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/category", catRoute);
app.use("/images", express.static(path.join(__dirname, "/uploads/")));
app.post("/api/upload", (req, res) => {
  const filename =req.files.file.name;
  const file = req.files.file;
  let uploadPath = __dirname + "/uploads/" + filename;
  file.mv(uploadPath, (err) => {
    if(err){
      return res.json(err);
    }
  });
  res.json("Uploaded...");
})

app.listen(process.env.PORT, () =>
  console.log(`Server is up and running on PORT: ${process.env.PORT}`)
);
