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
    
    const {fullName, email, password} = req.body
    await User.create({
        fullName, 
        email,
        password
    })
    return res.render('signin')
}

const sendSignInData = async (req,res)=> {
    const {email, password} = req.body
    
    try {
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