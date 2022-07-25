const db = require('../db/db')

class customerController {
    getInfo(req, res) {
        db.query("SELECT * FROM users WHERE id_user = ?", [req.userId])
        .then(info => {
            res.json(info[0])
        })
        .catch((err) => {
            console.log(err)
            res.json({message: "USER DOES NOT EXIST"})
        })
    }
}

module.exports = new customerController()