const mongoose = require('mongoose');

const connect = (url) => {
    mongoose.connect(url).then(() => {
        console.log("connected to db")
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = connect;