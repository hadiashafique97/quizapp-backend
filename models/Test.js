const mongoose = require("mongoose")


const testSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    duration:{
        type: Number,
        require: true, 
    },
    category:{
        type:String,
        required: true, 

    },
    totalScore: {
        type: Number,
        required: true, 
    },
    passingScore:{
        type: Number,
        required: true, 
    },
    questions:{
        type: [mongoose.Schema.Types.ObjectId], 
        ref: 'questions',
        required: true, 
    },
    
},{
    timestamps:true,
})

const Test = mongoose.model("tests", testSchema)
module.exports = Test