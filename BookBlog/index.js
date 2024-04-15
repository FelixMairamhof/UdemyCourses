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
app.post("/edit",async(req,res)=>{
    if(req.body.editItemId){
        const editId = req.body.editItemId;
    
        const data = await db.query("SELECT * FROM bookreview WHERE id = $1",[editId]);
        
        res.render("edit.ejs",{
            data: data.rows,
        }); 
    }
    else if(req.body.title){
        const title = req.body.title;
        const describtion = req.body.describtion;
        const rating = req.body.rating;
        const time = req.body.time;

        await db.query("UPDATE bookreview SET title = $1, describtion = $2, rating = $3, time = $4 WHERE title = $1 OR describtion =$2 OR rating = $3 OR time = $4",[title,describtion,rating,time]);
        
        res.redirect("/");
    }
    else{
        res.redirect("/");
    }




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
