const Router = require('express')
const router = new Router
const pagesController = require('../controllers/pagesController')

router.get('/mainimgurls', pagesController.mainImgs)

router.post('/category', pagesController.createCategory)
router.get('/category', pagesController.allCategory)
router.get('/category/:title', pagesController.categoryByTitle)
router.get('/categorydiscount', pagesController.discountItems)
router.get('/categorypopular', pagesController.popularPositions)


module.exports = router

