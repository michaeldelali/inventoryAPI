const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var historySchema = new mongoose.Schema({
    user:{
        type:String,
        // required:true,
        index:true,
    },
    activity:{
        type:String,
        // required:true,
    },
    itemId:{
        type:String,
        // required:true,
    },
    quantity:{
        type:Number,
        // require:true,
    },
    instock:{
        type:Number,
        // require:true,
    },
    infield:{
        type:Number,
        // require:true,
    },
    damaged:{
        type:Number,
        // require:true,
    }
    },
    {
        timestamps:true,
    });

//Export the model
module.exports = mongoose.model('History', historySchema);
