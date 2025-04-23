const mongoose=require('mongoose');
const User=require("./user");

const queriesSchema= new mongoose.Schema({
    prompt:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
},{timestamps:true});

const Query=mongoose.model('query',queriesSchema);

module.exports=Query;