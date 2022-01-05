var express = require('express');
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

    productHelpers.addProduct(req.body, (insertedId) => {
        let image = req.files.image
        image.mv('../SHOPPING CART/public/product-images/' + insertedId + '.jpg', (err, done) => {
            if (!err) {
                res.render("admin/add-products")

            } else {
                console.log(err)
            }
        })

    })


})

module.exports = router;