const {Router} = require('express')
const router = Router()
const {Blog} = require("../models/blog")
const {Comment} = require('../models/comment')
const {Image} = require('../models/images')
const uploadMiddleware = require('../middlewares/upload')
const uploadImageController = require('../controllers/image')


router.get('/add-new',(req,res)=> {
    return res.render('addBlog' ,{
        user:req.user
    })
})

router.get('/:id',async (req,res) => {
    // console.log("req",req.params.id)
    const blog = await Blog.findById(req.params.id).populate("createdBy")
    const comments = await Comment.find({blogId:req.params.id}).populate("createdBy")
    const images = await Image.find({}).populate("uploadedBy")
    console.log("all image",images)

    return res.render('blog',{
        user:req.user,
        blog,
        comments,
        images 
    })
})

router.post('/comment/:blogId',async (req,res)=> {
    await Comment.create({
        content:req.body.content,
        blogId:req.params.blogId,
        createdBy: req.user._id,
    })  

    return res.redirect(`/blog/${req.params.blogId}`)
})


router.post('/',uploadMiddleware.single('coverImage'),uploadImageController)
// async(req,res)=> {
    // const {title,body} = req.body
    // console.log(req, "request")
    // console.log(req.file,"alll data")
    // console.log(req.file.filename,"file name")
    // const Blog = await blog.create({
    //     title,
    //     body,
    //     coverImageURL:`req.url`,
    //     createdBy:req.user._id,
    // })
    // return res.redirect(`/blog/${Blog._id}`)
// })

// upload the image 


//to get all the images


module.exports = router