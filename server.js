const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req,res)=>{

res.json({
name:"AURA KAWAKI227 API",
status:"ONLINE"
});

});

app.get("/view-source", async (req,res)=>{

try{

const url = req.query.url;

if(!url){

return res
.status(400)
.send("URL Required");

}

const response =
await fetch(url);

const html =
await response.text();

res.send(html);

}catch(error){

res
.status(500)
.send(
"Error : " +
error.message
);

}

});

const PORT =
process.env.PORT || 3000;

app.listen(PORT,()=>{

console.log(
`AURA API RUNNING ON ${PORT}`
);

});