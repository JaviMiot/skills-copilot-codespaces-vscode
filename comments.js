// Create web server
// 1. npm init -y
// 2. npm i express
// 3. npm i -D nodemon
// 4. create app.js
// 5. create comments.js
// 6. node app.js
// 7. create a route for GET /comments
// 8. create a route for POST /comments
// 9. create a route for DELETE /comments/:id
// 10. create a route for PUT /comments/:id
// 11. create a route for GET /comments/:id
// 12. create a route for GET /comments/:id/replies
// 13. create a route for POST /comments/:id/replies
// 14. create a route for DELETE /comments/:id/replies/:replyId

const express = require('express');
const app = express();
const comments = require('./comments');
const port = 3000;

app.use(express.json());

app.get('/comments', (req, res) => {
    res.send(comments);
});

app.post('/comments', (req, res) => {
    let comment = req.body;
    comment.id = comments.length + 1;
    comments.push(comment);
    res.send(comment);
});

app.delete('/comments/:id', (req, res) => {
    let id = req.params.id;
    let index = comments.findIndex(comment => comment.id == id);
    if(index == -1) {
        res.status(404).send('Comment not found');
        return;
    }
    comments.splice(index, 1);
    res.send('Comment deleted');
});

app.put('/comments/:id', (req, res) => {
    let id = req.params.id;
    let index = comments.findIndex(comment => comment.id == id);
    if(index == -1) {
        res.status(404).send('Comment not found');
        return;
    }
    let comment = req.body;
    comment.id = id;
    comments[index] = comment;
    res.send(comment);
});

app.get('/comments/:id', (req, res) => {
    let id = req.params.id;
    let comment = comments.find(comment => comment.id == id);
    if(!comment) {
        res.status(404).send('Comment not found');
        return;
    }
    res.send(comment);
});