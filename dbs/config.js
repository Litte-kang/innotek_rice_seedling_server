var mongoose = require('mongoose');
var URL = 'mongodb://localhost/innotek_rice_seedling';

mongoose.connect(URL);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback(){
	console.log('innotek_rice_seedling database connect success');
});

module.exports = mongoose;
