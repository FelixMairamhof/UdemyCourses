import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

const exclude = "minutly,hourly,daily,alerts";
const ApiKey = "822ee4c59ba3b779789e777ddd31e691";

const latKlagenfurt = 46.639468;
const lonKlagenfurt = 14.305363;



app.use(express.static("public"));

app.get("/",async(req,res)=>{
    try{
        const data = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${latKlagenfurt}&lon=${lonKlagenfurt}&exclude=${exclude}&appid=${ApiKey}`);
        let tempKlagenfurt = data.current.temp;
        console.log(tempKlagenfurt);
        res.render("index.ejs",{
            tempKlagenfurt: tempKlagenfurt
        })
    } catch (error) {
        res.status(404).send(error.message);
    }

})

app.listen(port, ()=>{
    console.log("Server running on " + port);
})