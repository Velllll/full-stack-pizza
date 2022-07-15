const db = require('../db/dbAuth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secretKey = require('../config')

const generateAccessToken = (id, role) => {
    const payloda = {
        id,
        role,
    }
    return jwt.sign(payloda, secretKey.key, {expiresIn: '24h'})
}

class authController {

    async registration(req, res) {
        const {email, password} = req.body
        const hashPassword = bcrypt.hashSync(password, 7)
        db.query("INSERT INTO users (email, password, role) values (?, ?, 'USER')", [email, hashPassword])
        .then(() => {
            res.json({message: `${email} successfully registraed`})
        })
        .catch(err => res.json({message: err.message}))
    }

    async login(req, res) {
        const {email, password} = req.body
        db.query("SELECT * FROM users WHERE email = ?", [email])
        .then(value => {
            const user = value[0][0]
            if(user) {
                if(email !== user.email) return res.json({message: "Wrong email"})
                const validPassword = bcrypt.compareSync(password, user.password)
                if(!validPassword) return res.json({message: "Wrong password"})
                else {
                    const token = generateAccessToken(user.id_user, user.role)
                    return res.json({token, role: user.role})
                }
            } else {
                res.json({message: 'Wrong email'})
            }
        })
        .catch(err => {
            res.json({message: 'Error'})
        })
    }

    async islogin(req, res) {
        const { token } = req.body
        try {
            if(!token) return res.json({message: 'USER IS NOT LOGIN'})
            const decodedData = jwt.verify(token, secretKey.key)
            res.json(decodedData)
        } catch (error) {
            res.json({message: 'USER IS NOT LOGIN'})
        }
        
    }

}

module.exports = new authController