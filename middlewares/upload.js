const multer  = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads`))
    },
  
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}${Date.now()}-${file.originalname}`)
    }
    
  })

  //file filter function 
  const checkFileFilter = (req,file,cb)=> {
    if (file.mimetype.startsWith('image')) {
      cb(null,true)
    } else {
      cb(new Error ('Not an image! Please upload only image'))
    }
  }
  // multer middleware 
  const upload = multer({
     storage: storage,
     fileFilter:checkFileFilter,
     limits:{
      fileSize: 5*1024*1024 //5mb file size limit 
     }
     })
 module.exports = upload
