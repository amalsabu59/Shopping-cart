var express = require('express');
const res = require('express/lib/response');
var router = express.Router();
const productHelpers = require('../helpers/product-helpers');

/* GET home page. */
router.get('/', function(req, res, next) {
    productHelpers.getAllProducts().then((products) => {
        res.render('user/view-products', { admin: false, products })
    })
    
});
router.get('/login', function(req, res, ) {
    res.render('user/login')
    })
router.get('/signup',(req,res)=>{
    res.render('user/signup')
    
})


module.exports = router;