const express = require('express'),
    bodyParser = require('body-parser');
app = express();
TodoData = require('./model');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/list', (req, res) => {
    const query = req.query;
    console.log(query);
    const data = {
        code: 0,
        msg: 'success',
        data: '123456'
    };
    res.send(data);
});

app.post('/add', (req, res) => {
    const body = req.body;
    const todo = new TodoData(body);
    todo.save(() => {
        const data = {
            code: 0,
            msg: 'success',
            data: '123456'
        };
        res.send(data);
    });

});

app.put('/edit', (req, res) => {
    const body = req.body;
    console.log(body);
    const data = {
        code: 0,
        msg: 'success',
        data: '123456'
    };
    res.send(data);
});

app.delete('/delete', (req, res) => {
    const query = req.query;
    console.log(query);
    const data = {
        code: 0,
        msg: 'success',
        data: '123456'
    };
    res.send(data);
});

app.listen(8000);