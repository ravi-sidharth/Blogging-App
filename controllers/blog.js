const {Blog} = require('../models/blog')
const {Comment}= require('../models/comment')

const getAllBlogs = async(req,res)=> {
    try {
      const allBlog = await Blog.find({})
      return  res.render('home',{
         user:req.user,
         blogs:allBlog
      })
    } catch(err) {}
 }

 const getuserBlogs = async(req,res)=> {
   try{
      const allBlog = await Blog.find({createdBy:req.params.id}).populate("createdBy")
      return  res.render('userBlogs',{
         user:req.user,
         blogs:allBlog
      })
      } catch(e) {}
}
const getAddBlogs = (req,res)=> {
   try{
      return res.render('addBlog' ,{
         user:req.user
     })
   } catch(err) {}
}

const getBlogsByUserId = async (req,res) => {
   try{
      const blog = await Blog.findById(req.params.id).populate("createdBy")
      const comments = await Comment.find({blogId:req.params.id}).populate("createdBy")

      return res.render('blog',{
         user:req.user,
         blog,
         comments
      })
   } catch(err) {}
}

const getCommentsByBlogId = async (req,res)=> {
   try {
      await Comment.create({
         content:req.body.content,
         blogId:req.params.blogId,
         createdBy: req.user._id,
     })  
     return res.redirect(`/blog/${req.params.blogId}`)
   } catch{}
}

 module.exports = {
    getAllBlogs,
    getAddBlogs,
    getBlogsByUserId,
    getCommentsByBlogId,
    getuserBlogs

 }