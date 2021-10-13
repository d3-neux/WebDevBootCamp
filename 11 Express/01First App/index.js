const express = require('express');
const app = express();
/*
app.use((req, res) => {
    console.log("We have a new request");
    //res.send("Hello, whats up?");
})*/

app.get('/cats/:cat/:something', (req, res) => {
    const { cat, something }  = req.params
    console.log('Subreddit requested');

    res.send(`<h1>This is the ${cat} / ${something} subreddit</h1>`);
    
})


app.get('/search', (req, res) => {
    const { q } = req.query;

    if (!q) {
        res.send("No parameters here!");
    }
    else
        res.send(`Hi there ${q}...`);
})

app.get('/cats', (req, res) => {
    console.log('Cat requested');
    
    res.send('Meow!');
})

app.post('/cats', (req, res) => {
    console.log('Post Cat requested');
    
    res.send('Your post is here!');
})

app.get('/dogs', (req, res) => {
    console.log('Dog requested');
    
    res.send('Woof!');
})

app.get('/', (req, res) => {
    console.log('Root requested');
    
    res.send('Nothing here for you!');
})





app.get('*', (req, res) => {
    console.log('Whatever requested');
    
    res.send('IDK  that route!');
})





app.listen(3000, () => {
    console.log("This server is on!");
});


