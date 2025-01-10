const {Blog} = require('../models/blog')
const {Comment}= require('../models/comment')
const {Image} = require('../models/images')

const getAllBlogs = async(req,res)=> {
    const allBlog = await Blog.find({})
    return  res.render('home',{
       user:req.user,
       blogs:allBlog
    })
 }

const getAddBlogs = (req,res)=> {
   return res.render('addBlog' ,{
       user:req.user
   })
}

const getBlogsByUserId = async (req,res) => {
   const blog = await Blog.findById(req.params.id).populate("createdBy")
   const comments = await Comment.find({blogId:req.params.id}).populate("createdBy")

   return res.render('blog',{
       user:req.user,
       blog,
       comments
   })
}

const getCommentsByBlogId = async (req,res)=> {
   await Comment.create({
       content:req.body.content,
       blogId:req.params.blogId,
       createdBy: req.user._id,
   })  

   return res.redirect(`/blog/${req.params.blogId}`)
}

 module.exports = {
    getAllBlogs,
    getAddBlogs,
    getBlogsByUserId,
    getCommentsByBlogId,

 }