const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema({
    name:{
        type: String, 
        required: true, 
    },
    correctAnswer:{
        type: String, 
        required: true, 
    },
    choices:{
        type: Object, 
        required: true, 
    },
    test:{
        type: [mongoose.Schema.Types.ObjectId], 
        ref: "tests", 
    },
},{
        timestamps:true, 
    
})

const Question = mongoose.model("questions", questionSchema)

module.exports= Question