//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import {fileURLToPath} from "url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) =>{
    res.sendFile(__dirname + "/public/index.html");
})
app.get("/check", (req,res) => {
    res.sendFile(__dirname + "/public/secret.html");

})
app.post("/check",(req,res) => {
    let pw = req.body["password"];
    if(pw === "Hallo"){
        res.redirect("/check")
    }
    else{
        res.redirect("/");
    }
})

app.listen(3000, ()=>{
    console.log("Running on 3000");
})