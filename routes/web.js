const route = require("express").Router();
const homerouter = require("../app/http/controllers/home");
const authcontroller = require("../app/http/controllers/auth");
const cartcontroller = require("../app/http/controllers/customer/cart");
const { body } = require("express-validator");
const guest = require("../app/http/middlewares/guest")

route.get("/", homerouter().index);

route.get("/cart", cartcontroller().index);

route.post("/update-cart", cartcontroller().update);

route.get("/login", guest, authcontroller().login);

route.post("/login", [
  body('email').notEmpty().isEmail(),
  body('password').notEmpty()
],authcontroller().postlogin);

route.get("/register", guest, authcontroller().register);

route.post(
  "/register",
  [
    body("name","please check name").notEmpty(),
    body("email","please check email").isEmail(),
    body("password", ).notEmpty(),
  ],
  authcontroller().postregister
);

route.post('/logout',authcontroller().logout)

module.exports = route;
