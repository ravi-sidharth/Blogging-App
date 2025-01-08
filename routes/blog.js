const {Router} = require('express')
const router = Router()
const multer  = require('multer')
const path = require('path')
const {blog} = require("../models/blog")
const {comment} = require('../models/comment')

router.get('/add-new',(req,res)=> {
    return res.render('addBlog' ,{
        user:req.user
    })
})

router.get('/:id',async (req,res) => {
    // console.log("req",req.params.id)
    const Blog = await blog.findById(req.params.id).populate("createdBy")
    const comments = await comment.find({blogId:req.params.id}).populate("createdBy")
    console.log("comment",comments)

    return res.render('blog',{
        user:req.user,
        blog:Blog,
        comments
    })
})

router.post('/comment/:blogId',async (req,res)=> {
    await comment.create({
        content:req.body.content,
        blogId:req.params.blogId,
        createdBy: req.user._id,
    })

    return res.redirect(`/blog/${req.params.blogId}`)
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage })


router.post('/',upload.single('coverImage'),async(req,res)=> {
    const {title,body} = req.body
    // if both lower letter and upper letter blog are same that time server through a error because they will not get what you want to do that's why I have taken both differ variable.
    const Blog = await blog.create({
        title,
        body,
        coverImageURL:`/uploads/${req.file.filename}`,
        createdBy:req.user._id,
    })
    // console.log("blog Id",Blog._id)
    return res.redirect(`/blog/${Blog._id}`)
})

module.exports = router
// If I export this router on curly braces then I need to require on same name where I will require but if I export thir router without curly braces I will require this file with other name too.