const {User} = require('../models/user')

const renderSignInPage = (req,res)=> {
    return res.render('signin')
}

const renderSignUpPage =(req,res)=> {
    return res.render('signup')
}

const userLogout = (req,res)=> {
    return res.clearCookie('token').redirect('/')
}

const sendSignUpData = async (req,res)=> {
    try {
        const {fullName, email, password} = req.body

        const existEmail =  await User.findOne({email})
        if (existEmail) {
            throw new Error("Email already Exist, please try again with another email!") 
        }

        await User.create({
            fullName, 
            email,
            password
        })
        return res.render('signin')

    } catch(err) {
        console.log(err)
        res.render('signup',{
            "error":"Email already exists, please try again with another email!"
        })
        
    }
}

const sendSignInData = async (req,res)=> {
    try {
        const {email, password} = req.body
        const token = await User.matchPasswordAndGenerateToken(email,password) 
        return res.cookie("token",token).redirect('/')
    } catch(err) {
        console.log(err)
        res.render('signin',{"error":"Incorrect Email or Password"})
    }
    
}

module.exports = {
    renderSignInPage,
    renderSignUpPage,
    userLogout,
    sendSignUpData,
    sendSignInData,

}