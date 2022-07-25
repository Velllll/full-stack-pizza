const Router = require('express')
const customerController = require('../controllers/customerController')
const router = new Router
const roleMiddleware = require('../middlewares/roleMiddleware')
const userByIdAccessMiddleware = require('../middlewares/userById')

router.get('/getinfo/:id', userByIdAccessMiddleware, roleMiddleware("USER"), customerController.getInfo)

module.exports = router