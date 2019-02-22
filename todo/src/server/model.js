const mongoose = require('./db'),
      Schema = mongoose.Schema;
const TodoSchema = new Schema({
    name: {
        type: String
    },
    complete: {
        type: Boolean
    }
}, {
    collection: 'task'
});
module.exports = mongoose.model('TodoData',TodoSchema);