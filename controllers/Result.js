const router = require("express").Router()
const authenticationMiddleware = require('../middleware/authenticationMiddleware')
const Test = require('../models/Test')
const User = require('../models/User')
const Result = require("../models/Result")
// add result 

router.post("/add-result", authenticationMiddleware, async (req, res) => {
    try {
        const newResult = new Result(req.body)
        await newResult.save()
        res.send({
            message: "Result addedd successfuly",
            success: true,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        })
    }
})

// getting all results 

router.post("/get-all-results", authenticationMiddleware, async (req, res) => {
    try {
        const results = await Result.find({})
        res.send({
            message: "Results fetched successfuly",
            success: true,
            data: results, 
            results: results,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        })
    }
})

// get all results by user id 

router.post("/get-all-results-by-user", authenticationMiddleware, async (req, res) => {
    try {
        const results = await Result.find({ user: req.body.userId}).lean().populate("test").populate("user").sort({createdAt : -1})
        res.send({
            message: "Results fetched successfuly",
            data: results, 
            success: true,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        })
    }
})

module.exports = router