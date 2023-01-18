const router = require('express').Router

const User = require('../../backend/models/User')
const bcrypt = require('bcryptjs')


//to register your user 
router.post('/register', async (req, res) => {
    try {
        // existing user or not?
        const userExists = await User.findOne({ email: req.body.email })
        if (userExists) {
            return res
                .status(200)
                .send({ message: "Whoops, Sorry User already exists, try logging in ", success: false })
        }
        //hashing password to make it more secure through bcrypt 
        const salt = await bcrypt.genSalt(8)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword

        // creating the user 
        const newUser = new User(req.body)
        await newUser.save()
        res.send({
            message: "You have successfully created your User Login",
            success: true
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