var express=require('express');
var path = require('path');
var Fashion = require('../models/fashion');
var async = require("async");
var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    host: "smtp.gmail.com",
    secure:true,
    auth: {
        user: "long.lythien3@gmail.com",
        pass: "Lamtruong123"
    }
});


/*MAIN PAGE*/

exports.mainpage = async function(req,res) {
    	
	try{
		let distincttype = await Fashion.distinct('gender');
		var productsnav = [];
		for (var i = 0 ; i <distincttype.length ; i++){
			let something = await Fashion.distinct('tags').and([{gender:distincttype[i]}]);
			productsnav.push(something);
		};
		res.render('main.ejs',{
			distincttype: distincttype,
			productsnav:productsnav
		});
	}
	catch (err){
		
	}
	
}

/* FASHION SEARCH PAGE */

exports.fashionpagesearch = async function(req,res,next){
	var perPage = 25;
	var page = (parseInt(req.query.page)) || 1;
	var myfashion = req.query.query;
	var sortby = req.query.sortby || "";
	var sortoption = {};
	if(sortby.localeCompare("title-ascending") == 0){
		sortoption = {'name':1};
	} else if (sortby.localeCompare("title-descending") == 0){
		sortoption = {'name':-1};
	} else if (sortby.localeCompare("price-ascending") == 0) {
		sortoption = {'price':1};
	} else if (sortby.localeCompare("price-descending") ==0 ){
		sortoption = {'price':-1};
	}
	var products = await Fashion.find({"name":{"$regex":myfashion,"$options":"i"}}).limit(perPage).skip((perPage * page) - perPage).sort(sortoption);
	var count = await Fashion.count({"name":{"$regex":myfashion,"$options":"i"}});
	let distincttype = await Fashion.distinct('gender');
	var productsnav = [];
	for (var i = 0 ; i <distincttype.length ; i++){
		let something = await Fashion.distinct('tags').and([{gender:distincttype[i]}]);
		productsnav.push(something);
	};
	res.render('fashionsearch.ejs',{
		products:products,
		current:page,
		pages: Math.ceil(count / perPage),
		distincttype:distincttype,
		productsnav:productsnav,
		query:myfashion
	})
}

/* FASHION PAGE */

exports.fashionpage = async function(req,res,next){
	var gender = req.query.gender;
	var perPage = 25;
	var page = (parseInt(req.query.page)) || 1;
	var tags = req.query.tags || "";
	var sortby = req.query.sortby || "";
	var sortoption = {};
	if(sortby.localeCompare("title-ascending") == 0){
		sortoption = {'name':1};
	} else if (sortby.localeCompare("title-descending") == 0){
		sortoption = {'name':-1};
	} else if (sortby.localeCompare("price-ascending") == 0) {
		sortoption = {'price':1};
	} else if (sortby.localeCompare("price-descending") ==0 ){
		sortoption = {'price':-1};
	}
	if(tags.localeCompare("") == 0){
		let products = await Fashion.find({'gender':gender}).skip((perPage * page) - perPage).limit(perPage).sort(sortoption);
		let count = await Fashion.count({'gender':gender});
		let category = await Fashion.distinct('tags').and([{gender:gender}]);
		let distincttype = await Fashion.distinct('gender');
		var productsnav = [];
		for (var i = 0 ; i <distincttype.length ; i++){
			let something = await Fashion.distinct('tags').and([{gender:distincttype[i]}]);
			productsnav.push(something);
		};
		res.render('fashion.ejs',{
			products: products,
			current: page,
			pages: Math.ceil(count / perPage),
			category:category,
			distincttype:distincttype,
			productsnav:productsnav,
			tags:""
		})
	}
	else{
		let products = await Fashion.find({'gender':gender,'tags':tags}).skip((perPage * page) - perPage).limit(perPage).sort(sortoption);
		let count = await Fashion.count({'gender':gender,'tags':tags});
		let category = await Fashion.distinct('tags').and([{gender:gender}]);
		let distincttype = await Fashion.distinct('gender');
		var productsnav = [];
		for (var i = 0 ; i <distincttype.length ; i++){
			let something = await Fashion.distinct('tags').and([{gender:distincttype[i]}]);
			productsnav.push(something);
		};
		res.render('fashion.ejs',{
			products: products,
			current: page,
			pages: Math.ceil(count / perPage),
			category:category,
			distincttype:distincttype,
			productsnav:productsnav,
			tags:tags
		})
	}
}

/* PRODUCT DETAIL PAGE */

exports.detailpage = function(req,res,next){
	var productcode = req.params.id || req.query.id;
	Fashion.find({'productcode':productcode})
	.limit(1)
	.exec(async function(err,products,next){
		if(err){
			return next(err);
		}
		let distincttype = await Fashion.distinct('gender');
		var productsnav = [];
		for (var i = 0 ; i <distincttype.length ; i++){
			let something = await Fashion.distinct('tags').and([{gender:distincttype[i]}]);
			productsnav.push(something);
		};
		res.render('productdetails.ejs',{
			products:products,
			distincttype:distincttype,
			productsnav:productsnav
		});
	})
}

/* CONTACT PAGE */

exports.contactpage = async function(req,res,next){
	let distincttype = await Fashion.distinct('gender');
	var productsnav = [];
	for (var i = 0 ; i <distincttype.length ; i++){
		let something = await Fashion.distinct('tags').and([{gender:distincttype[i]}]);
		productsnav.push(something);
	};
	res.render('contact.ejs',{
		distincttype:distincttype,
		productsnav:productsnav
	});
}

/* PAYMENT PAGE */

exports.paymentpage = async function(req,res) {
	
	try{
		let distincttype = await Fashion.distinct('gender');
		var productsnav = [];
		for (var i = 0 ; i <distincttype.length ; i++){
			let something = await Fashion.distinct('tags').and([{gender:distincttype[i]}]);
			productsnav.push(something);
		};
		res.render('payment.ejs',{
			distincttype: distincttype,
			productsnav:productsnav
		});
	}
	catch (err){
		
	}
	
}

/* SEARCH FASHION */
exports.searchfashion = async function(req,res,next){
	var myfashion = req.query.query;
	let result = await Fashion.find({"name":{"$regex":myfashion,"$options":"i"}}).select({"title":1,"_id":0,"productcode":1});
	res.send(result);
	
}


/* SEND EMAIL */

exports.sendemail = async function(req,res,next){
	var mailOptions={
			   to : req.query.to,
			   subject : req.query.subject,
			   text : req.query.text
			};
	smtpTransport.sendMail(mailOptions, function(error, response){
		if(error){
			console.log(error);
			res.end("error");
		} else {
		console.log("Message sent: " + response.message);
			res.end("sent");
		}
	});
}

/* ADMINISTRATION LOG IN */

exports.administration = async function(req,res,next){
	res.render('administration/mainpage.ejs');
}

exports.savenewproduct = async function(req,res,next){
	var title = req.query.title;
	var name = req.query.name;
	var price = req.query.price;
	var gender = req.query.gender;
	var image = req.query.image;
	var productcode = req.query.productcode;
	var size = req.query.size;
	var tags = req.query.tags;
	var newproduct = new Fashion ({
		title:title,
		name:name,
		price:price,
		gender:gender,
		image:image,
		productcode:productcode,
		size:size,
		tags:tags
	});
	console.log(newproduct.title);
	newproduct.save(function(err,result){
		if(err){
			console.log(err);
		}
		else {
			console.log("successfully save to database");
		}
	})
	
}