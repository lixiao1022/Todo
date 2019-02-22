const mongoose = require('./db'),
      Schema = mongoose.Schema;
const TodoSchema = new Schema({
    name: {
        type: String
    },
    complete: {
        type: String
    }
}, {
    collection: 'task'
});
module.exports = mongoose.model('TodoData',TodoSchema);