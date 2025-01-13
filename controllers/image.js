const {Image} = require('../models/images')
const uploadToCloudinary = require('../helpers/cloudinary')
const { Blog } = require('../models/blog')

const uploadImage = async(req,res)=> {
    try{
        // check if file is missing in req object
        if (!req.file) {
            return res.status(400).render('addBlog',{
            message:'File is required Please upload your file'
            })
        }

        // upload to cloudinary
        const {url, publicId} = await uploadToCloudinary(req.file.buffer)

        // store the image url and public id along with the uploaded user id 
        const newlyUploadedImage = await Image.create({
           url,
           publicId,
           uploadedBy:req.user._id
        })

        const blog =await Blog.create({
            title:req.body.title,
            body:req.body.body,
            coverImageURL:newlyUploadedImage.url,
            createdBy:req.user._id,
        })
        return res.redirect(`/blog/${blog._id}`)

    } catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:"Something went wrong Please try again!"
        })
    }
}

module.exports = uploadImage