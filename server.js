const express = require("express");
const app     = express();
const PORT    = process.env.PORT || 3737 ;
const path    = require("path");
const expresslayout = require("express-ejs-layouts");

app.use(express.static(path.join(__dirname,'public')));

const viewpath = path.join(__dirname ,'resources','views')

app.set('views', viewpath)
app.set('view engine','ejs')
app.use(expresslayout)
app.get('/',(req,res)=> {
    res.render("home")
})

app.get("/cart",(req,res)=> {
    res.render('costemer/cart')
})

app.get("/login",(req,res)=> {
    res.render('auth/login')
})
app.get("/register",(req,res)=> {
    res.render('auth/register')
})

app.listen(PORT,()=> {
    console.log(`server listening to ${PORT}`)
})