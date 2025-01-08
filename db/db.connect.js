const mongoose = require('mongoose')

async function connectionMongoDB(url) {
    return mongoose.connect(url)
}

module.exports = connectionMongoDB


