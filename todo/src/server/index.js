const express = require('express'),
      bodyParser = require('body-parser'),
      app = express(),
      User = require('./UserModel');

const login = require('./router/login');
const task = require('./router/task');

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

app.use('/api/login', login);
app.use('/api/task', task);

app.listen(8002);