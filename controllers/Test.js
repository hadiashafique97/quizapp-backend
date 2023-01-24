const router = require('express').Router()
const Test = require('../models/Test')
const authenticationMiddleware = require('../middleware/authenticationMiddleware')


// adding test 

router.post('/add', authenticationMiddleware, async (req, res) => {
    try {
        req.body.questions = []
        const newTest = new Test(req.body)
        await newTest.save()
        res.send({
            message: "Test created successfully",
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

//getting all tests 
router.post('/get-all-tests', authenticationMiddleware, async (req, res) => {
    try {
        const tests = await Test.find({})
        res.send({
            message: "All Tests Colected Successfully",
            data: tests,
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

//get exam by specific id 

router.post("/get-test-by-id", authenticationMiddleware, async (req, res) => {
    try {
        const test = await Test.findById(req.body.testId)
        res.send({
            message: "Test CollectedSuccessfully ",
            data: test,
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

// editing specific test by id 
router.post("/edit-test-by-id", authenticationMiddleware, async(req, res)=>{
    try {
        await Test.findByIdAndUpdate(req.body.testId, req.body)
        res.send({
            message: "Test edited Successfuly", 
            success: true, 
        })
    } catch (error) {
        res.status(500).send({
            message: error.message, 
            data: error, 
            success:false, 
        })
    }
})

// deleting test by id 
router.post("/delete-test-by-id", authenticationMiddleware, async (req,res)=>{
    try {
        await Test.findByIdAndDelete(req.body.testId)
        res.send({
            message: "Deleted",
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