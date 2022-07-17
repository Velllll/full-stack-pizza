const Router = require('express')
const adminController = require('../controllers/adminController')
const router = new Router
const roleMiddleware = require('../middlewares/roleMiddleware')

router.get('/users', roleMiddleware("ADMIN"), adminController.getUsers)
router.get('/products', roleMiddleware("ADMIN"), adminController.getProducts)
router.get('/products/:id', roleMiddleware("ADMIN"), adminController.getProductById)
router.put('/products/:id', roleMiddleware("ADMIN"), adminController.editProductById)
module.exports = router
