const route = require('express').Router();
const homerouter = require("../app/http/controllers/home")
const authcontroller = require("../app/http/controllers/auth")
const cartcontroller = require("../app/http/controllers/customer/cart")
route.get('/', homerouter().index)

route.get("/cart", cartcontroller().index)

route.post('/update-cart',cartcontroller().update)

route.get('/login',authcontroller().login)

route.get("/register", authcontroller().register)

route.post("/register",(req,res)=> {
    
})

module.exports = route;