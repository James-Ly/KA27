var express=require('express');
var app=express();
var bodyparser=require('body-parser');
var path=require('path');
var router=require('./app/router/router.js');
app.use(bodyparser.json());
app.set('views',path.join(__dirname,'app/views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyparser.urlencoded());
app.use('/',router);
app.listen(3000,function(){
    console.log('survey app listening on port 3000');
});