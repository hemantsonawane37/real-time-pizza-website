const express = require("express");
const app     = express();
const PORT    = process.env.PORT || 3737 ;
const path    = require("path");

app.use(express.static(path.join(__dirname,'public')));

const viewpath = path.join(__dirname ,'resources','views')
app.set('views', viewpath)
app.set('view engine','ejs')

app.get('/',(req,res)=> {
    res.render("home")
})

app.listen(PORT,()=> {
    console.log(`server listening to ${PORT}`)
})