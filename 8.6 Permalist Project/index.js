import express, { query } from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "postgres",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



app.get("/",async(req, res) => {
  const items = await db.query("SELECT * from todo");
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items.rows,
  });
});

app.post("/add", async(req, res) => {
  const item = req.body.newItem;
  await db.query("INSERT INTO todo (title) VALUES ($1)",[item]);
  res.redirect("/");
});

app.post("/edit", async(req, res) => {
  const updateId = req.body.updatedItemId;
  const updateTitle = req.body.updatedItemTitle;
  await db.query("UPDATE todo SET title = $1 WHERE id = $2",[updateTitle, updateId]);
  res.redirect("/");
});

app.post("/delete", async(req, res) => {
  const deleteId = req.body.deleteItemId;
  await db.query("DELETE FROM todo WHERE id=$1",[deleteId]);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
