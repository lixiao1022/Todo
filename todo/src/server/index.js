const express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    Todo = require('./model');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/list', (req, res) => {
    const query = req.query;
    Todo.find(query, (err, response) => {
        const data = {
            code: 0,
            msg: 'get list success',
            data: response
        };
        res.send(data);
    });
});

app.post('/add', (req, res) => {
    const body = req.body;
    Todo.create(body, (err, response) => {
        const data = {
            code: 0,
            msg: 'add task success',
            data: response._id
        };
        res.send(data);
    });
});

app.put('/edit', (req, res) => {
    const body = req.body;
    Todo.findByIdAndUpdate(body._id, {
        complete: body.complete == 'false' ? 'true' : 'false'
    }, () => {
        const data = {
            code: 0,
            msg: 'edit task success',
            data: ''
        };
        res.send(data);
    });
});

app.delete('/delete', (req, res) => {
    const query = req.query;
    const _ids = query._ids.split(',');
    Todo.remove({
        _id: {
            $in: _ids
        }
    }, () => {
        const data = {
            code: 0,
            msg: 'remove success',
            data: ''
        };
        res.send(data);
    });
});

app.listen(8000);