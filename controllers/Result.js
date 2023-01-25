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

router.post("/get-all-results", authenticationMiddleware, async(req, res) => {
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

// get all results by user id 

router.post("/get-all-results-by-user-id", authenticationMiddleware, async(req, res) => {
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

module.exports = router