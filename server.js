const express = require("express");
const app = express();
const PORT = process.env.PORT || 3737;
const path = require("path");
require("dotenv").config();
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongoDBstore = require("connect-mongo");
const passport = require("passport");
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const url = "mongodb://localhost:27017/pizza";
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});
const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("conected to db");
  })
  .catch((err) => {
    console.log(err);
  });


  let mongodb = new MongoDBstore({
      mongoUrl: url,
    collection: "sessions",
  });

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongodb,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 24 },
  })
);


app.use((req, res, next) => {
  res.locals.session = req.session
  if(req.session.passport !== undefined){
     res.locals.user = req.session.passport.user
   }
  console.log(req.session)

  next()
})

const passportinit = require("./app/config/passport")
passportinit(passport)
app.use(passport.initialize())
app.use(passport.session())
 

app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
const expresslayout = require("express-ejs-layouts");
const route = require("./routes/web");

app.use(expresslayout);
const viewpath = path.join(__dirname, "resources", "views");
app.set("views", viewpath);
app.set("view engine", "ejs");


app.use(route);

app.listen(PORT, () => {
  console.log(`server listening to ${PORT}`);
});
