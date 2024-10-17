const express = require("express");
const dotenv = require("dotenv");
const connect = require("./connect");
const userroute = require("./routes/userroute");
const passwordroute = require("./routes/passwordroute");
const cors = require("cors");
const path = require("path");

dotenv.config();
connect();


const app = express();
const port = process.env.PORT || 3030;
app.use(cors())

const _dirname = path.resolve();



app.use(express.json());



app.use("/api/v1/user" , userroute);
app.use("/api/v1/password" , passwordroute);

app.use(express.static(path.join(_dirname , "./frontend/dist")));
app.get('*' , (req,res)=>{
  res.sendFile(path.resolve(_dirname , "frontend" , "dist" , "index.html"));
} )

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
