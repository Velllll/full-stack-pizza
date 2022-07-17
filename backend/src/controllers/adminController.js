const dbUsers = require('../db/dbAuth')
const dbProducts = require('../db/dbPages')

class AdminController {
    async getUsers(req, res) {
        dbUsers.query("SELECT id_user, email, role FROM users")
        .then(data => {
            console.log('ADMIN gets data about users')
            res.json(data[0])
        })
        .catch(err => {
            console.log(err)
            res.json({message: "error geting data about users"})
        })
    }

    async getProducts(req, res) {
        dbProducts.query('SELECT * FROM category')
        .then(data => {
            console.log('ADMIN gets products')
            res.json(data[0])
        })
        .catch(err => {
            console.log(err)
            res.json({message: "error geting data about products"})
        })
    }

    async getProductById(req, res) {
        const productId = req.params.id
        dbProducts.query("SELECT * FROM category WHERE category_id = ?", [productId])
        .then(data => {
            res.json(data[0])
        })
        .catch(err => {
            console.log(err)
            res.json({message: "THIS PRODUCT DOES NOT EXIST"})
        })
    }

    async editProductById(req, res) {
        const {title, img, name, discription, price, discount, category_id} = req.body
        dbProducts.query("UPDATE category SET title = ?, img = ?, name = ?, discription = ?, price = ?, discount = ? WHERE category_id = ?", [
            title, img, name, discription, price, discount, category_id
        ])
        .then(() => res.json({message: `Product id: ${category_id} was uppdate`}))
        .catch(err => res.json({message: "ERROR"}))
    }
}

module.exports = new AdminController