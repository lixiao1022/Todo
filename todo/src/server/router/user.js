const express = require('express'),
      router = express.Router(),
      Todo = require('../TaskModel'),
      User = require('../UserModel');

router.post('/in', (req, res) => {
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

router.get('/pages', (req, res) => {
    const query = req.query;
    User.find(query, (err, response) => {
        if (response.length == 1) {
            res.send({
                code: 200,
                msg: 'get peges success',
                data: response[0].pages
            });
        } else {
            res.send({
                code: -1,
                msg: 'get peges error',
                data: []
            });
        }
    })
});

router.get('/', (req, res) => {
    const query = req.query;
    User.find(query, (err, response) => {
        res.send({
            code: 200,
            msg: 'get user success',
            data: response
        });
    })
});

router.post('/', (req, res) => {
    const body = req.body;
    User.find({ tel: body.tel }, (err, response) => {
        if (response.length == 0) {
            User.create(body, (err, data) => {
                res.send({
                    code: 200,
                    msg: 'add user success',
                    data: data
                });
            });
        } else {
            res.send({
                code: -1,
                msg: '用户已存在！',
                data: ''
            });
        }
    });
});

router.delete('/', (req, res) => {
    const query = req.query;
    User.remove(query, () => {
        const task = { user_id: query._id };
        Todo.remove(task, () => {
            res.send({
                code: 200,
                msg: 'remove user success',
                data: ''
            });
        }); 
    });
});

module.exports = router;