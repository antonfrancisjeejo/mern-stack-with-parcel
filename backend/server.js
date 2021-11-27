const express = require("express");
const cookieSession = require("cookie-session");
const connectDB = require("./config/db");
const accountRouter = require("./routes/account");
const apiRouter = require("./routes/api");
const path = require("path");

connectDB();
const app = express();
app.use(express.static("dist"));
app.use(express.json());
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

app.use("/account", accountRouter);
app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  res.status(500).send(err.message || "There was an error!");
});

app.get("*", (req, res) => {
  console.log(path.join(__dirname, "../dist/index.html"));
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.get("/home", (req, res) => {
  res.send("ho");
});

app.listen(3000, () => {
  console.log("Server is up and running");
});
