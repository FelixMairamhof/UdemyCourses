import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) =>{
    res.render("index.ejs")
})
app.post("/blogs", (req,res) =>{
    let inputText = req.body["text"];
    let inputTitle = req.body["title"];

    res.render("blogs.ejs",{
        text: inputText,
        title: inputTitle
    });
    
})
app.get("/blogs",(req,res)=>{
    res.render("blogs.ejs");
})
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });