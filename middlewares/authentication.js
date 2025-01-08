const { validateUserToken } = require("../services/authentication")

function checkAuthenticationForUser(cookieName) {
    return (req,res,next) => {
        const tokenCookieValue = req.cookies[cookieName]

        if (!tokenCookieValue) {
            return next()    
        }
        try {
           const userPayload = validateUserToken(tokenCookieValue)
           req.user = userPayload
        } catch(err) {}
        return next()
    }
}

module.exports = {
    checkAuthenticationForUser
}