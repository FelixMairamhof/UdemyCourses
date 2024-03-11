import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

const exclude = "minutly,hourly,daily,alerts";
const ApiKey = "877d8f5c9a2b5e3b8d609a3ff3b6f42f";

const latKlagenfurt = 46.639468;
const lonKlagenfurt = 14.305363;



app.use(express.static("public"));

app.get("/",async(req,res)=>{
    try{
        const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latKlagenfurt}&lon=${lonKlagenfurt}&appid=${ApiKey}`);
        data = JSON.parse(data);
        let tempKlagenfurt = data.cord.lon;
        res.render("index.ejs",{
            tempKlagenfurt: tempKlagenfurt
        })
    } catch (error) {
        
        res.send(error.message);
    }

})

app.listen(port, ()=>{
    console.log("Server running on " + port);
})