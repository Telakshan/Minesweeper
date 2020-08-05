const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const User = require('./src/models/user');
const Game = require('./src/models/game');
require('./src/db/mongoose');


const port = process.env.PORT || 5000;
 


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



 //set static folder
 app.use(express.static(path.join(__dirname, 'public')));

 app.use(express.json());
 app.use(express.urlencoded({extended: false}));


app.post('/game', (req, res) => {
    
    const body = JSON.stringify(req.body);

    const game = new Game({
        gameJSON: body
    });
    game.save().then(() => {
        res.send(game);
    }).catch(() => {
        res.status(400).send(e);
    })
})

app.post('/register', (req, res) => {
    const data = req.body;
    console.log(data);

    const user = new User(req.body);

    user.save().then(() => {
        res.send(user);
    }).catch(() => {
        res.status(400);
    })
})


app.get('/game',(req, res) => {
    Game.findOne({}).then((games)=>{
        res.send(games.gameJSON);
    }).catch(() => {
        res.status(400);
    })
});



app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username: username, password: password}).then((user) => {
        
        console.log(user);
    }).catch(() => {
        res.status(400);
    })
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

























