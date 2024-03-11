import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

const ApiKey = "877d8f5c9a2b5e3b8d609a3ff3b6f42f";

const latKl = 46.639468;
const lonKl = 14.305363;

const latZü = 47.365933;
const lonZü = 8.534504;

const latZa = 45.479662;
const lonZa = 13.506812;


app.use(express.static("public"));

app.get("/",async(req,res)=>{
    try{
        const resultKl = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latKl}&lon=${lonKl}&appid=${ApiKey}&units=metric`);
        const resultZü = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latZü}&lon=${lonZü}&appid=${ApiKey}&units=metric`);
        const resultZa = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latZa}&lon=${lonZa}&appid=${ApiKey}&units=metric`);

    
        res.render("index.ejs",{
            tempKl: resultKl.data.main.temp,
            weatherKl: resultKl.data.weather[0].main,

            tempZü: resultZü.data.main.temp,
            weatherZü: resultZü.data.weather[0].main,

            tempZa: resultZa.data.main.temp,
            weatherZa: resultZa.data.weather[0].main,
        })
    } catch (error) {
        
        res.send(error.message);
    }

})

app.listen(port, ()=>{
    console.log("Server running on " + port);
})