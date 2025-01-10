const JWT = require('jsonwebtoken')

const secret =process.env.secret_code

function createTokenForUser(user) {
    const payload ={
        userName :user.fullName,
        _id :user.id,
        email:user.email,
        profileImageURL:user.profileImageURL,
        role:user.role
    }
    const token = JWT.sign(payload,secret)

    return token
}

function validateUserToken(token) {
    const payload = JWT.verify(token,secret)
    return payload
}

module.exports = {
    createTokenForUser, 
    validateUserToken
}