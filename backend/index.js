require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const HttpCodesRouter = require("./routes/HttpCode");
const UserRouter = require("./routes/User");
const ChatRouter = require("./routes/Chat");
const RelationRouter = require("./routes/Relation");
const SecurityRouter = require("./routes/Security");
const checkAuthentication = require("./middlewares/checkAuthentication");
const cors = require("cors");

app.use(express.json());

app.use(cors({ credentials: true, origin: "*" }));

app.get("/", (req, res, next) => {
  res.send("Hello world!");
});

app.get("/test", (req, res) => {
  res.status(200).json({
    message: "Succes ! Connexion avec le node réussis",
  });
});

//app.use(HttpCodesRouter);
app.use(SecurityRouter);
app.use(checkAuthentication, RelationRouter);
app.use("/http-codes", HttpCodesRouter);
app.use("/users", checkAuthentication, UserRouter);
app.use("/chats", checkAuthentication, ChatRouter);

app.listen(port, () => console.log(`Server started ${port}`));
