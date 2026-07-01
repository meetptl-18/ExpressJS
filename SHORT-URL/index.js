const express = require("express");
const path = require("path");
const staticRoute = require("./routes/staticRouter");

const app = express();
const PORT = 8001;

const { Connection } = require("./connection");
const urlRouter = require("./routes/url");

//conecttion:
Connection("mongodb://127.0.0.1:27017/short");

//middleware:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//routes:
app.use("/url", urlRouter);
app.use("/", staticRoute);

app.listen(PORT, () => {
  console.log(`Server Run At Port:${PORT}`);
});
