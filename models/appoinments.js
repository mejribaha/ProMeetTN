const mongoose = require('mongoose')
const user = require('./user')
const appoinmentSchema = new mongoose .Schema({
    user:user,
    name:String,
    professionel:String,
    Date:Date

})

module.exports = mongoose.model('appoinments', appoinmentSchema)