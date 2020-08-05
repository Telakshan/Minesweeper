const mongoose = require('mongoose');

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



