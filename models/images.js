const {Schema, model} = require('mongoose')

const imageSchema = new Schema({
    url:{
        type:String,
        required:true
    },
    publicId:{
        type:String,
        required:true
    },
    uploadedBy :{
        type:Schema.Types.ObjectId,
        ref:"user",
    }
},{ timestamps:true})

const Image = model('image',imageSchema)

module.exports ={
    Image
}