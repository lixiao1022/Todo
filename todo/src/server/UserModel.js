const mongoose = require('./db'),
      Schema = mongoose.Schema;
const UserSchema = new Schema({
    tel: {
        type: String
    },
    name: {
        type: String
    },
    password: {
        type: String
    },
    pages: {
        type: Array
    }
}, {
    collection: 'user'
});

const User = mongoose.model('UserData', UserSchema);

User.find({name: 'admin'}, (err, res) => {
    if (res.length == 0) {
        User.create({
            tel: 'admin',
            name: 'admin',
            password: 'admin',
            email: 'admin@admin.com',
            pages: ['/', '/user']
        });
    }
});

module.exports = User;