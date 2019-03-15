const express = require('express'),
      bodyParser = require('body-parser'),
      path = require('path'),
      app = express(),
      user = require('./router/user');
      task = require('./router/task');

const c = require('child_process');

app.use(express.static(path.join(__dirname, '../../dist')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.sendFile( __dirname + "/" + "index.htm" );
});

app.use('/api/user', user);
app.use('/api/task', task);

app.listen(8002, () => {
    // 启动之后自动打开默认浏览器
    // c.exec('start http://127.0.0.1:8002/');
});