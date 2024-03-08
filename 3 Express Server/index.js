import express from "express"
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server is on ${port}`);
});

app.get("/", (req,res) => {
    res.send("<h1>Hello World</h1>")
});
app.get("/about", (req,res) => {
    res.send("<h1>About</h1>")
});
app.get("/contact", (req,res) => {
    res.send("<h1>Contact</h1>")
});