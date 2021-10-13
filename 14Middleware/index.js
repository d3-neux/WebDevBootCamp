const express = require('express');
const app = express();

const morgan = require('morgan');
const AppError = require('./AppError')

app.use(morgan('common'));
app.use((req, res, next) => {
    console.log('middle fingerware');
    return next();
})
app.use((req, res, next) => {
    console.log('the other middle fingerware');
    return next();
})


const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    console.log(req.query);

    if (password === 'ChickenNuggets') {
        return next();
    }
    // res.send('sorry you need a password');

    throw new AppError('Password requiredx', 401);
}

app.get('/secret', verifyPassword, (req, res, next) => {
    res.send('I see dead people');
})

app.get('/admin', (req, res, next) => {
    throw new AppError('You are not an admin!!!', 403)
})

app.get('/', (req, res) => {
    res.send('home page');
})

app.get('/error', (req, res) => {
    chicken.fly();
})

app.get('/dogs', (req, res) => {
    res.send('woof woof');
})


//404 route
app.use((req, res,) => {
    res.status(404).send('no way out!!!');
})


// app.use((err, req, res, next) => {
//     console.log('***************************');
//     console.log('*************ERROR*********');
//     console.log('***************************');
//     return next(err);

//     res.status(500).send(`what do you thing? it's an error!!!`);
// })

app.use((err, req, res, next) => {
    const { status = 500, message = "Standard error!!!" } = err;
    res.status(status).send(message);

    
})


app.listen(3000, () => {
    console.log('listening on http://localhost');
})

