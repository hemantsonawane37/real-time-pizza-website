const route = require("express").Router();
const homerouter = require("../app/http/controllers/home");
const authcontroller = require("../app/http/controllers/auth");
const cartcontroller = require("../app/http/controllers/customer/cart");
const { body } = require("express-validator");
const guest = require("../app/http/middlewares/guest")
const ordercontroller = require("../app/http/controllers/customer/order")
const auth = require('../app/http/middlewares/auth')
const isadmin = require("../app/http/middlewares/admin")
const adminOrderController = require('../app/http/controllers/admin/orderController')

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

route.post('/orders',auth,[
  body('phone').isLength({min:10 , max:10}),
  body('address').isAlpha()
],ordercontroller().store)

route.get('/customer/orders',auth,ordercontroller().index)

// admin routes
route.get('/admin/orders', isadmin , adminOrderController().index)
module.exports = route;
