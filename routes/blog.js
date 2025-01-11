const {Router} = require('express')
const router = Router()
const uploadImageController = require('../controllers/image')
const uploadmiddleware = require('../middlewares/upload')
const { getAddBlogs,getBlogsByUserId, getCommentsByBlogId, getuserBlogs } = require('../controllers/blog')

router.get('/add-new',getAddBlogs)
router.get('/:id/:name',getuserBlogs)
router.get('/:id',getBlogsByUserId)
router.post('/comment/:blogId',getCommentsByBlogId)
router.post('/',uploadmiddleware.single('coverImage'),uploadImageController)


module.exports = router