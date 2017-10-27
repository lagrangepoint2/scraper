var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema ({
    urlPath: {type: String, required: true},
    articleTitle: {type: String, required: true},
    excerpt: {type: String, required: true},
    notes: {type: String, required: true}
});

module.exports = mongoose.model('SavedArticles', schema);