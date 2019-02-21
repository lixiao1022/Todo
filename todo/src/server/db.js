const mongoose = require('mongoose'),
      DB_URL = 'mongodb://localhost:27017/todoDB';

mongoose.connect(DB_URL);

mongoose.connection.on('connected', function () {    
    console.log('连接成功：' + DB_URL);
});    

mongoose.connection.on('error',function (err) {    
    console.log('连接失败: ' + err);
});    
 
mongoose.connection.on('disconnected', function () {    
    console.log('断开连接');
});

module.exports = mongoose;