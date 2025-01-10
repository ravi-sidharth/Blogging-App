const {Image} = require('../models/images')
const uploadToCloudinary = require('../helpers/cloudinary')
const { Blog } = require('../models/blog')

const uploadImage = async(req,res)=> {
    try{
        // check if file is missing in req object
        if (!req.file) {
            console.log(req.file,"request file")
            return res.status(400).json({
                success:false,
                message:'File is required Please upload your file'
            })
        }

        // upload to cloudinary
        const {url, publicId} = await uploadToCloudinary(req.file.path)

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated.',
            });
        }
        // console.log(req.user,"request")

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

    } catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message:"Something went wrong Please try again!"
        })
    }
}

module.exports = uploadImage