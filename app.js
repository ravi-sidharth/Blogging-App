require('dotenv').config()
const express = require('express')
const path = require('path')
const userRouter = require('./routes/user')
const blogRouter= require('./routes/blog')
const connectionMongoDB = require('./db/db.connect')
var cookieParser = require('cookie-parser')
const { checkAuthenticationForUser } = require('./middlewares/authentication')
const {blog} = require('./models/blog')


const app = express()
const Port = process.env.PORT || 3000

app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkAuthenticationForUser('token'))
app.use(express.static(path.resolve('./public')))

// monogo connect with db 
connectionMongoDB(process.env.MONGO_URL).then(()=>console.log('MongoDB is Connected!'))

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.get('/',async(req,res)=> {
   // if (!req.user) return res.render('signin')
   const allBlog = await blog.find({})
   return  res.render('home',{
      user:req.user,
      blogs:allBlog
   })
})
app.use('/user',userRouter)
app.use('/blog',blogRouter)

app.listen(Port, ()=> console.log(`Server Started at Port: ${Port}`))

