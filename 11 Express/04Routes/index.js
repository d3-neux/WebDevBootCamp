const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let comments = [
    {
        id: uuidv4(),
        username: 'Tood',
        comment: 'Oops I shot him :('
    },
    {
        id: uuidv4(),
        username: 'Skyle',
        comment: 'My husband is Heisenberg'
    },
    {
        id: uuidv4(),
        username: 'Hank',
        comment: 'Fuck you Walt'
    },
    {
        id: uuidv4(),
        username: 'Walter',
        comment: 'lol I malcom\'s dad'
    },

];


app.get('/', (req, res) => {
    res.redirect('/comments');
});

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment });
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');

})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const comment = comments.find(c => c.id === id);
    console.log(`${id} ${comment} ${newCommentText}`);
    if (comment) {
        comment.comment = newCommentText;
        res.redirect('/comments');
    }
    else {
        res.send('not found');
    }
});

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    if (comment)
        res.render('comments/show', { comment });
    else
        res.redirect('/comments');
});

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ id: uuidv4(), username, comment });
    console.dir(comments);
    res.redirect('/comments');
});

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
});

app.get("/tacos", (req, res) => {
    res.send(`get /tacos response`);
});

app.post("/tacos", (req, res) => {
    console.log(req.body);
    const { meat, qty } = req.body;
    res.send(`We got ${qty} ${meat} TACOS!!`);
});

app.listen(3000, () => {
    console.log("Running");
});