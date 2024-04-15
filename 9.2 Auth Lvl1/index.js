import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "auth1",
  password: "postgres",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {

  const password = req.body.password;
  const email = req.body.username;

  const checkPassword = await db.query("SELECT * FROM users WHERE email = $1",[email]);

  if(checkPassword.rows.length > 0){
    res.send("User already exists");

  }else{
    await db.query("INSERT INTO users (email,password) VALUES ($1,$2)",[email,password]);
    res.redirect("/login");
  }

  
});

app.post("/login", async (req, res) => {
  const password = req.body.password;
  const email = req.body.username;

  try{
    const data = await db.query("SELECT * FROM users WHERE email = $1",[email]);

    if(data.rows.length > 0){
      
      const user = data.rows[0];
      const storedPassword = user.password;

      if(storedPassword === password){
        res.redirect("/secrets");
      }else{
        res.send("Wrong Password");
      }
   
    }else{
      res.send("User not found");
    }
  }catch(err){
   console.log(err);
  }

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
