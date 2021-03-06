const { response } = require('express');
var express = require('express');
const { redirect } = require('express/lib/response');
const res = require('express/lib/response');
const async = require('hbs/lib/async');
const { PRODUCT_COLLECTION } = require('../config/collections');
var router = express.Router();
const productHelpers = require('../helpers/product-helpers');
const userHelpers=require('../helpers/user-helpers');
const verifyLogin=(req,res,next)=>{
    if(req.session.loggedIn){
        next()
    }else{
        res.redirect('/login')
    }
}

/* GET home page. */
router.get('/',async function(req, res, next) {
    let user=req.session.user
    console.log(user);
    let cartCount=null
    if(req.session.user){
    cartCount=await userHelpers.getCartCount(req.session.user._id)
    }
    productHelpers.getAllProducts().then((products) => {
        res.render('user/view-products', {products,user ,cartCount})
    })
    
});
router.get('/login', function(req, res, ) {
    if(req.session.loggedIn){
        res.redirect('/')
    }else{
    res.render('user/login',{"loginErr":req.session.loginErr})
    console.log(loginErr)
    req.session.loginErr=false
 }
 })
router.get('/signup',(req,res)=>{
    res.render('user/signup')
    
})
router.post('/signup',(req,res)=>{
    userHelpers.doSignup(req.body).then((response)=>{
       
        console.log(response)
        req.session.loggedIn=true
        req.session.user=response
        res.redirect('/')
        

    })

    
})
router.post('/login',(req,res)=>{
    userHelpers.doLogin(req.body).then((response)=>{
        if(response.status){
            req.session.loggedIn=true
            req.session.user=response.user
            res.redirect('/')
        }else{
            req.session.loginErr=true
            res.redirect('/login')
        }
    })
})
router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/');
})   
router.get('/cart',verifyLogin,async(req,res)=>{
    let products=await userHelpers.getCartProducts(req.session.user._id)
    let total=0   
    if(products.length>0){
     
    total=await userHelpers.getTotalAmount(req.session.user._id)
    console.log(products);
    }
    
    res.render('user/cart',{products,user:req.session.user,total})
})
router.get('/add-to-cart/:id',verifyLogin,(req,res)=>{
    userHelpers.addToCart(req.params.id,req.session.user._id).then(()=>{
        res.redirect('/')
    })
})
router.post('/change-product-quantity',(req,res,next)=>{
    console.log(req.body)
    userHelpers.changeProductQuantity(req.body).then((response)=>{
        res.json(response)
         

    })
})
router.get('/place-order',verifyLogin,async(req,res)=>{
    let total=await userHelpers.getTotalAmount(req.session.user._id)
    res.render('user/place-order',{total,user:req.session.user})
    
})

router.post('/place-order',async(req,res)=>{
    let products=await userHelpers.getCartProductList(req.body.userId)
    let totalPrice=await userHelpers.getTotalAmount(req.body.userId)
     userHelpers.placeOrder(req.body,products,totalPrice).then((orderId)=>{
         if(req.body['payment-method']==='COD'){
            res.json({codSuccess:true})
         }else{
             userHelpers.generateRazorpay(orderId,totalPrice).then((response)=>{
                 console.log("hai"+orderId);
               res.json(response) 
             })
         }
         

    })
    console.log(req.body);
})
router.get('/order-success',(req,res)=>{
    res.render('user/order-success',{user:req.session.user})
})
router.get('/orders',async(req,res)=>{
    let orders=await userHelpers.getUserOrders(req.session.user._id)
    res.render('user/orders',{user:req.session.user,orders})
})
router.get('/view-order-products/:id',async(req,res)=>{
    let products=await userHelpers.getOrderProducts(req.params.id)
    res.render('user/view-order-products',{user:req.session.user,products})
})
router.post('/verfiy-payment',(req,res)=>{
    console.log(req.body);
    userHelpers.verifyPayment(req.body).then(()=>{
        console.log("payment success");
        res.json({status:true})
    })
})
module.exports = router;