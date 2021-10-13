const express = require('express');
const app = express();
const User = require('./models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const session = require('express-session')


mongoose.connect('mongodb://localhost:27017/authDemo', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("connection established");
})
.catch(err => {
    console.log('Error !! ', err);
})

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'notagoodsecret' }));


const requiredLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login');
    }
    next();
}


app.get('/', (req, res) => {
    res.send('this is the home page');
})

app.post('/register', async (req, res) => {
    const { password, username } = req.body;
    const hash = await bcrypt.hash(password, 12)
    const user = new User({
        username,
        password: hash
    });

    await user.save();
    req.session.user_id = user._id;

    console.log(user);

    res.redirect('/')
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    const foundUser = await User.findAndValidate(username, password)

    console.log(foundUser)
    if (!foundUser) {
        res.redirect('/login')
    }
    else
    {
        req.session.user_id = foundUser._id
        res.redirect('/secret');
    }  
})

app.post('/logout', async (req, res) => {
    req.session.user_id = null;
    req.session.destroy();


    res.redirect('/login'); 
})

app.get('/secret', requiredLogin, (req, res) => {
    res.render('secret');
})

app.get('/topsecret', requiredLogin, (req, res) => {
    res.send('top secret!!!');
})


app.listen(3000, () => {
    console.log('serving your app')
})