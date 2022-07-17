const jwt = require('jsonwebtoken')
const secret_key = require('../config')

module.exports = function(role) {
    return function(req, res, next) {
        if(req.method === "OPTIONS") next()
        try {
            const token = req.headers.authorization.split(' ')[1]
            if(!token) return res.json({message: "USER IS NOT LOGIN"})
            const user = jwt.verify(token, secret_key.key)
            if(user.role !== role) return res.json({message: "YOU DONT HAVE ACCESS FOR THIS"})
            next()
        } catch (error) {
            console.log(error)
            res.json({message: "YOU DONT HAVE ACCESS FOR THIS"})
        }
    }
}