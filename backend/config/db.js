const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://tuckxoxo789:tuckxoxo789@cluster0.r7i9rdc.mongodb.net/carrender?retryWrites=true&w=majority");

const iutenmSchema = new mongoose.Schema({
    day:{
        type:Number,
        required:true
    },
    month:{
        type:Number,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    id_user:{
        type:String,
        required:true
    },
    todo:{
        type:[String],
        required:true
    }
});
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

});
const Item = mongoose.model("items",iutenmSchema);
const Users = mongoose.model("users",userSchema);
module.exports = {Item,Users}