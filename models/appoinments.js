const mongoose = require('mongoose')
const appoinmentSchema = new mongoose .Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    name:String,
    professionel:String,
    Date:Date

})

module.exports = mongoose.model('appoinments', appoinmentSchema)