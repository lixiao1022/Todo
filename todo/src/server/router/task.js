const express = require('express'),
      router = express.Router(),
      User = require('../UserModel'),
      Todo = require('../TaskModel');

router.get('/', (req, res) => {
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

router.post('/', (req, res) => {
    const body = req.body;
    User.find({ _id: body.user_id }, (err, users) => {
        if (users.length == 1) {
            Todo.create(body, (err, response) => {
                const data = {
                    code: 200,
                    msg: 'add task success',
                    data: response
                };
                res.send(data);
            });
        } else {
            res.send({
                code: -1,
                msg: 'unknow user',
                data: ''
            });
        }
    })
});

router.put('/', (req, res) => {
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

router.delete('/', (req, res) => {
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


router.put('/all', (req, res) => {
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

router.delete('/done', (req, res) => {
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

module.exports = router;