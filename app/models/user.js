const mongoose = require('mongoose');
const userScema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true
},
role:{
    type:String,
    default:'customer'
}
},{timestamps:true})

module.exports = mongoose.model('User',userScema)