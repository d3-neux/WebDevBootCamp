const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json');


app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


app.get('/', (req, res) => {
    //res.send('Hi!');
    res.render('home');
});

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    
    // console.log(data);
    if (data) {
        res.render('subreddit', { ...data });
    } else {
        res.render('notfound', { subreddit });
    }
});

app.get('/rand', (req, res) => {
    const number = Math.floor(Math.random() * 30);
    res.render('random', { number });
});

app.get('/cats', (req, res) => {
    const cats = ['blue', 'rocket', 'another cat', 'pinky'];

    res.render('cats', { cats });
});

app.listen(3000, () => {
    console.log("listening on port 3000");
    // console.dir(redditData);
});

