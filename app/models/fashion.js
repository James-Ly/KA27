var mongoose = require('./database');


var fashschema = new mongoose.Schema(
		{title: String,
		name:String,
		price: Number,
		gender:String,
		image:[String],
		productcode:String,
		size:[String],
		tags:[String]
		})



fashschema.statics.findGenderfashion = function(gender,page,callback){
	var perPage = 25;
	
	
	return this.find({'gender':gender})
	.skip((perPage * page)- perPage)
	.limit(perPage)
	.exec(function(err,results){
		return this.count().exec
	})
	
//	.skip(())
	.sort({'_id':-1})
	.exec(callback)
}

var Fashion = mongoose.model('Fashion',fashschema,'fashion');

module.exports = Fashion;