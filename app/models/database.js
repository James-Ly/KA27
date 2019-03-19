var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/KA27',function(){
	console.log('mongodb connected')
});

module.exports = mongoose;


