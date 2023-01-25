const mongoose = require("mongoose")

const resultSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "users",
    },
    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "tests",
    },
    result: {
        type: Object,
        required: true,
    },

}, {
    timestamps: true, 
}
)

const Result = mongoose.model("results", resultSchema)

module.exports = Result