const db = require('../db/db')

class AdminController {
    async getUsers(req, res) {
        db.query("SELECT id_user, email, role FROM users WHERE role = 'USER'")
        .then(data => {
            console.log('ADMIN gets data about users')
            res.json(data[0])
        })
        .catch(err => {
            console.log(err)
            res.json({message: "error geting data about users"})
        })
    }

    async deleteUser(req, res) {
        const id = req.params.id
        db.query("DELETE FROM users WHERE id_user = ?", [id])
        .then(() => {
            res.json({message: `USER WITH ID:${id} WAS DELETED`})
        })
        .catch(err => {
            console.log(err)
            res.json({message: `USER WITH ID:${id} WAS NOT DELETED`})
        })
    }

    async getProducts(req, res) {
        db.query('SELECT * FROM category')
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
        db.query("SELECT * FROM category WHERE category_id = ?", [productId])
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
        db.query("UPDATE category SET title = ?, img = ?, name = ?, discription = ?, price = ?, discount = ? WHERE category_id = ?", [
            title, img, name, discription, price, discount, category_id
        ])
        .then(() => res.json({message: `Product id: ${category_id} was uppdate`}))
        .catch(err => res.json({message: "ERROR"}))
    }

    async deleteProduct(req, res) {
        const productId = req.params.id
        db.query("DELETE FROM category WHERE category_id = ?", [productId])
        .then(() => res.json({message: "PRODUCT WAS DELETE"}))
        .catch((err) => {
            console.log(err)
            res.json({message: "PRODUCT WAS NOT DELETE"})
        })
    }

    async addProduct(req, res) {
        const {title, img, name, discription, price, discount} = req.body
        db.query("INSERT INTO category (title, img, name, discription, price, discount) values (?, ?, ?, ?, ?, ?)", [title, img, name, discription, price, discount])
        .then(() => {
            res.json({message: `${name} WAS ADDED`})
        })
        .catch(err => {
            console.log(err)
            res.json({message: `${name} WAS NOT ADDED`})
        })
    }
}

module.exports = new AdminController