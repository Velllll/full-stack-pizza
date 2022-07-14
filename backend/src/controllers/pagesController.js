const db = require('../db/dbPages')

class PagesController {

    async mainImgs(req, res) {
        db.query('SELECT * FROM mainimgurls')
        .then(data => {
            res.json(data[0])
        })
        .catch(err => console.log(err)) 
    }

    async discountItems(req, res) {
        db.query("SELECT * FROM category WHERE discount > 0")
        .then(data => {
            res.json(data[0])
        })
        .catch(err => console.log(err)) 
    }   

    async allCategory(req, res) {
        db.query("SELECT * FROM category")
        .then(data => {
            res.json(data[0])
        })
        .catch(err => console.log(err)) 
    }

    async categoryByTitle(req, res) {
        const title = req.params.title
        db.query("SELECT * FROM category WHERE title = ?", [title])
        .then(data => {
            res.json(data[0])
        })
        .catch(err => console.log(err)) 
    }

    async popularPositions(req, res) {
        db.query("SELECT * FROM category WHERE discount > 0")
        .then(data => {
            res.json(data[0])
        })
        .catch(err => console.log(err)) 
    }

    async createCategory(req, res) {
        const info = req.body
        db.query("INSERT INTO category (title, img, name, discription, price, discount) values (?, ?, ?, ?, ?, ?)", [
            info.title, info.img, info.name, info.discription, info.price, info.discount
        ])
        .then(() => res.json({message: `position ${info.name} was added`}))
        .catch(err => {
            res.json(err)
            console.log(err)
        })
    }

}

module.exports = new PagesController