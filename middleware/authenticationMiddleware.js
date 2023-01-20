const jwebt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1]
        const decodedToken = jwebt.verify(token, process.env.JWEBT_SECRET)
        const userId = decodedToken.userId
        req.body.userId = userId
        next()
    } catch (error) {
        res.status(401).send({
            message: "You are not an authenticated user",
            data: error,
            success: false
        })
    }
}