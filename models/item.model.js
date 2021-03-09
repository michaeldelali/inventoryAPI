const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var itemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    type:{
        type:String,
    },
    remarks:{
        type:String,
    },
    instock:{
        type:Number,
        require:true,
    },
    infield:{
        type:Number,
        require:true,
    },
    condition:{
        type:String,
    },
    vendor:{
        type:String,
    },
    damaged:{
        type:Number,
        require:true,
    }
    },
    {
        timestamps:true,
    });

//Export the model
module.exports = mongoose.model('Item', itemSchema);
