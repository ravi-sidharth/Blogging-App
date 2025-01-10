const {Router} = require('express')
const { renderSignInPage, renderSignUpPage, userLogout, sendSignUpData, sendSignInData } = require('../controllers/user')

const router = Router()

router.get('/signin',renderSignInPage)
router.get('/signup',renderSignUpPage)
router.get('/logout',userLogout)
router.post('/signup',sendSignUpData)
router.post('/signin',sendSignInData)

module.exports = router 
