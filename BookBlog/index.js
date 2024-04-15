import express, { query } from "express";
import pg from "pg";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "bookBlog",
  password: "postgres",
  port: 5432,
});
db.connect();
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",async(req,res)=>{
    const data = await db.query("SELECT * FROM bookreview");
    
    res.render("index.ejs",{
        data: data.rows,
    });
});
app.post("/edit",(req,res)=>{

});
app.get("/edit",(req,res)=>{
    res.render("edit.ejs");
});

app.post("/delete",async(req,res)=>{
    const deleteId = req.body.deleteItemId;
    await db.query("DELETE FROM bookreview WHERE id = $1",[deleteId]);
    res.redirect("/");
});

app.get("/create",(req,res)=>{
    res.render("create.ejs");
});
app.post("/create", async (req,res)=>{
    const title = req.body.title;
    const describtion = req.body.describtion;
    const rating = req.body.rating;
    const time = req.body.time;

    await db.query("INSERT INTO bookreview (title,describtion,rating,time) VALUES ($1,$2,$3,$4)",[title,describtion,rating,time]);

    res.redirect("/");
});

app.listen(port, ()=>{
    console.log("Running on port" + port);
});
