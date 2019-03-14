const express = require('express'),
      router = express.Router(),
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

module.exports = router;