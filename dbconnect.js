const mongoose = require('mongoose');

const dbconnect = mongoose.connect('mongodb+srv://admin:admin@cluster0.qfwdf.mongodb.net/myprj?retryWrites=true&w=majority')

dbconnect.then((db) => {
    console.log('database connected success')
})

module.exports = dbconnect;