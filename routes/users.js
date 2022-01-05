var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let products = [{
            name: "iphone 11",
            category: "mobile",
            description: "fastest ever",
            image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone11-black-select-2019?wid=834&hei=1000&fmt=jpeg&qlt=95&.v=1566956144418"

        },
        {
            name: "One plus 9",
            category: "mobile",
            description: "fastest ever",
            image: "https://happimobiles.s3.ap-south-1.amazonaws.com/happi/WHBXBHXB-1616745334779.jpg"

        },
        {
            name: "Samsung s22",
            category: "mobile",
            description: "fastest ever",
            image: "https://www.corning.com/microsites/csm/gorillaglass/Samsung/CGG_Samsun_galaxys21_phantom.jpg"

        },
        {
            name: "Realme",
            category: "mobile",
            description: "fastest ever",
            image: "https://image01.realme.net/general/20210401/1617294011898.png"
        },
    ]
    res.render('index', { title: 'Express', products, admin: false });
});


module.exports = router;