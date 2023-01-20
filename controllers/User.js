const router = require('express').Router()

const User = require('../../backend/models/User')
const bcrypt = require("bcryptjs")
const jwebt = require('jsonwebtoken')

//to register your user 
router.post('/register', async (req, res) => {
    try {
        // existing user or not?
        const existingUser = await User.findOne({ email: req.body.email })
        if (existingUser) {
            return res
                .status(400)
                .send({ message: "Whoops, Sorry User already exists, try logging in ", success: false })
        }
        //hashing password to make it more secure through bcrypt 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword

        // creating the user 
        const newUser = new User(req.body)
        await newUser.save()
        res.send({
            message: "You have successfully created your User Login",
            success: true,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        })
    }

})

// login 

router.post('/login', async (req, res) => {

    try {

        await User.findOne({ email: req.body.email })
            .then(async user => {
                if (!user) {
                    return res
                        .status(400)
                        .send({ message: "User does not exist", success: false })
                }
                //check user password 
                let validPassword
                
                 bcrypt.compare(req.body.password, user.password, (err, data) => {
                    //if error than throw error
                    if (err) throw err
    
                    //if both match than you can do anything
                    const token = jwebt.sign(
                        {userId: User._id},
                        process.env.JWEBT_SECRET,
                        {expiresIn: "2d"})
                    if (data) {
                        return res.status(200).send({ message: "Login successful" ,  success: true, data: token})
                    } else {
                        return res.status(401).send({ message: "Email or password incorrect ", success: false})
                    }
    
                })
            })
            // const token = jwebt.sign(
            //     {userId: User._id},
            //     process.env.JWEBT_SECRET,
            //     {expiresIn: "2d"})

    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        })
    }
})




module.exports = router