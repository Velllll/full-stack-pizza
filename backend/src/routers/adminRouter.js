const Router = require('express')
const adminController = require('../controllers/adminController')
const router = new Router
const roleMiddleware = require('../middlewares/roleMiddleware')

router.get('/users', roleMiddleware("ADMIN"), adminController.getUsers)
router.delete('/user/:id', roleMiddleware("ADMIN"), adminController.deleteUser)
router.get('/products', roleMiddleware("ADMIN"), adminController.getProducts)
router.post('/products', roleMiddleware("ADMIN"), adminController.addProduct)
router.get('/products/:id', roleMiddleware("ADMIN"), adminController.getProductById)
router.put('/products/:id', roleMiddleware("ADMIN"), adminController.editProductById)
router.delete('/products/:id', roleMiddleware("ADMIN"), adminController.deleteProduct)

module.exports = router
