const mongoose = require('mongoose');
const validator = require('validator');

// const UserSchema = mongoose.Schema({
//     username:{
//         type: String,
//         required: true
//     },email: {
//         type: String,
//         required: true
//     }, password:{
//         type: String,
//         required: true
//     }
// })





const User = mongoose.model('User',{
    username: {
        type: String,
        
    }, email: {
        type: String,
        
        
    },password:{
        type: String,
    }
});

module.exports = User;

//const User = module.exports = mongoose.model('User', UserSchema);



