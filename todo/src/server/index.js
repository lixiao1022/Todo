const express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    User = require('./UserModel'),
    Todo = require('./TaskModel');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

User.find({name: 'admin'}, (err, res) => {
    if (res.length == 0) {
        User.create({
            name: 'admin',
            password: 'admin'
        });
    }
});

User.find({name: '001'}, (err, res) => {
    if (res.length == 0) {
        User.create({
            name: '001',
            password: '123456'
        });
    }
});

app.post('/api/login/in', (req, res) => {
    const body = req.body;
    User.find(body, (err, response) => {
        if (response.length == 1) {
            const data = {
                code: 200,
                msg: 'login success',
                data: response[0]._id
            };
            res.send(data);
        } else {
            res.send({
                code: -1,
                msg: '密码错误！',
                data: ''
            });
        }
    });
});

app.get('/api/task', (req, res) => {
    const query = req.query;
    Todo.find(query, (err, response) => {
        const data = {
            code: 200,
            msg: 'get list success',
            data: response
        };
        res.send(data);
    });
});

app.post('/api/task', (req, res) => {
    const body = req.body;
    Todo.create(body, (err, response) => {
        const data = {
            code: 200,
            msg: 'add task success',
            data: response
        };
        res.send(data);
    });
});

app.put('/api/task', (req, res) => {
    const body = req.body;
    Todo.findByIdAndUpdate(body._id, {
        complete: body.complete ? false : true
    }, (err, response) => {
        const data = {
            code: 200,
            msg: 'edit task success',
            data: response
        };
        res.send(data);
    });
});

app.put('/api/allTask', (req, res) => {
    const body = req.body;
    const type = body.type;
    const user_id = body.user_id;
    Todo.updateMany({
        complete: type,
        user_id
    }, {
        complete: !type
    }, (err, response) => {
        const data = {
            code: 200,
            msg: 'edit all task success',
            data: response
        };
        res.send(data);
    });
});

app.delete('/api/task', (req, res) => {
    const query = req.query;
    const _ids = query._ids.split(',');
    Todo.remove({
        _id: {
            $in: _ids
        }
    }, () => {
        const data = {
            code: 200,
            msg: 'remove success',
            data: ''
        };
        res.send(data);
    });
});

app.delete('/api/doneTask', (req, res) => {
    const user_id = req.query.user_id;
    Todo.remove({
        complete: true,
        user_id
    }, () => {
        const data = {
            code: 200,
            msg: 'remove done success',
            data: ''
        };
        res.send(data);
    });
});

app.listen(8002);