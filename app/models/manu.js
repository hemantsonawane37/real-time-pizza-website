const mongoose = require('mongoose');
const menuScema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
image:{
    type:String,
    required:true
},
price:{
    type:String,
    required:true
},
size:{
    type:String,
    required:true
}
})

module.exports = mongoose.model('Menu',menuScema)