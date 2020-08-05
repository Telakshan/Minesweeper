const mongoose = require('mongoose');

const db = 'mongodb+srv://dante:inferno@minesweeper.aclmb.mongodb.net/Game?retryWrites=true&w=majority';

mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected!');
})

//mongodb+srv://dante:inferno@minesweeper.aclmb.mongodb.net/Game?retryWrites=true&w=majority