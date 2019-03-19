var express=require('express');
var controller=require('../controller/controller.js');
var router=express.Router();

router.get('/',controller.mainpage);
router.get('/fashion/',controller.fashionpage);
router.get('/productdetail/',controller.detailpage);
router.get('/productdetail/:id',controller.detailpage);
router.get('/contact/',controller.contactpage);
router.get('/payment/',controller.paymentpage);
router.get('/sendemail/',controller.sendemail);
router.get('/searchfashion/',controller.searchfashion);
router.get('/fashionsearch/',controller.fashionpagesearch);
router.get('/administration/',controller.administration);
router.get('/savenewproduct/',controller.savenewproduct);

module.exports=router;