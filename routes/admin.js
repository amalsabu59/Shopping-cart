const { response } = require('express');
var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();
const productHelpers = require('../helpers/product-helpers');





/* GET users listing. */
router.get('/', function(req, res, next) {
    productHelpers.getAllProducts().then((products) => {
        res.render('admin/view-products', { admin: true, products })
    })

});
router.get('/add-products', function(req, res, ) {
    res.render('admin/add-products')


})
router.post('/add-products', function(req, res) {
    console.log(req.body);
    console.log(req.files.image);

    productHelpers.addProduct(req.body, (Id) => {
        let image = req.files.image
        image.mv('../SHOPPINGCART/public/product-images/' +Id + '.jpg', (err, done) => {
            if (!err) {
                res.render("admin/add-products")

            } else {
                console.log(err)
            }
        })

    })


})
router.get('/delete-product/:Id',(req,res)=>{
    let proId=req.params.Id
    console.log(proId);
    productHelpers.deleteProduct(proId).then((response)=>{
        res.redirect('/admin/')
    })

})
router.get('/edit-product/:id',async(req,res)=>{
    let product=await productHelpers.getProductDetails(req.params.id)
    console.log(product);
    res.render('admin/edit-product',{product})
})
router.post('/edit-product/:id',(req,res)=>{
    console.log(req.params.id);
    productHelpers.updateProduct(req.params.id,req.body)
    res.redirect('/admin')
})

module.exports = router;