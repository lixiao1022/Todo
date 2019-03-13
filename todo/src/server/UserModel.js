const mongoose = require('./db'),
      Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String
    },
    password: {
        type: String
    }
}, {
    collection: 'user'
});
module.exports = mongoose.model('UserData', UserSchema);