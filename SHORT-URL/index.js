const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { authUser, restrictTo } = require("./middleware/auth");
const app = express();
const PORT = 8001;
const { Connection } = require("./connection");

const urlRouter = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRouter = require("./routes/user");

// Connection
Connection("mongodb://127.0.0.1:27017/short");

//middleware:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authUser);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//routes:
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRouter);
app.use("/", staticRoute);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server Run At Port:${PORT}`);
});
