const express = require('express'),
    router = express.Router(),
    Product = require('../models/product'),
    upload = require('express-fileupload');

router.use(upload());

/* GET home page. */

router.get('/', function (req, res, next) {
    res.render('pages/index');
});

router.post('/data', function (req, res, next) {
    var product = new Product;
    product.image = req.files.image;
    product.imageSV = req.files.imageSV;
    product.imageFV = req.files.imageFV;
    product.imageBV = req.files.imageBV;
    product.name = req.body.name;
    product.shortDescription = req.body.shortDescription;
    product.fullDescription = req.body.fullDescription;
    product.price = req.body.price;
    product.quantity = req.body.quantity;
    product.category = req.body.category;
    product.brand = req.body.brand;
    product.save(function (err, produc) {
        if (err) throw err;
        console.error('saved img to mongo');
    })

});
router.get('/image', function (req, res, next) {
    Product.findById('5bee82f8ca5397557ca38d99', function (err, doc) {
        if (err) return next(err);
        res.contentType(doc.image.contentType);
        res.send(doc.image.data);
    });
});

router.get('/shop', function (req, res, next) {
    var productschun = [];
    var firstchunk = [];
    var chunksize = 9;
    var pages = [];
    var nextp = [];
    Product.find((err, docs) => {
        for (var i = 9; i < docs.length; i += chunksize) {
            productschun.push(docs.slice(i, i + chunksize));
        };
        nextp.push({
            nxt: "content-page" + (productschun.length + 1)
        });

        firstchunk.push(docs.slice(0, chunksize));
        for (var i = 1; i <= productschun.length; i++) {

            var page = {
                pagenum: i + 1,
                pageId: "page" + (i + 1),
            }
            pages.push(page);
        }

        res.send({
            firstchunk: firstchunk,
            product: productschun,
            page: pages,
            prev: "content-page1",
            nextp: nextp
        });
    });
});

router.get('/laptop-shop', function (req, res, next) {
    var firstchunk = [];
    var laptop = [];
    var chunksize = 9;
    var pages = [];
    var nextp = [];
    Product.find({
        category: 'laptop'
    }, (err, docs) => {
        for (var i = 9; i < docs.length; i += chunksize) {
            laptop.push(docs.slice(i, i + chunksize));
        };
        nextp.push({
            nxt: "content-page" + (laptop.length + 1)
        });

        firstchunk.push(docs.slice(0, chunksize));
        for (var i = 1; i <= laptop.length; i++) {

            var page = {
                pagenum: i + 1,
                pageId: "page" + (i + 1),
            }
            pages.push(page);
        }
        res.send({
            firstchunk: firstchunk,
            product: laptop,
            page: pages,
            prev: "content-page1",
            nextp: nextp
        });
    });
});

router.get('/mobile-shop', function (req, res, next) {
    var firstchunk = [];
    var mobile = [];
    var chunksize = 9;
    var pages = [];
    var nextp = [];
    Product.find({
        category: 'mobile'
    }, (err, docs) => {
        for (var i = 9; i < docs.length; i += chunksize) {
            mobile.push(docs.slice(i, i + chunksize));
        };
        nextp.push({
            nxt: "content-page" + (mobile.length + 1)
        });

        firstchunk.push(docs.slice(0, chunksize));
        for (var i = 1; i <= mobile.length; i++) {

            var page = {
                pagenum: i + 1,
                pageId: "page" + (i + 1),
            }
            pages.push(page);
        }
        res.send({
            firstchunk: firstchunk,
            product: mobile,
            page: pages,
            prev: "content-page1",
            nextp: nextp
        });
    });
});

router.get('/accessories-shop', function (req, res, next) {
    var firstchunk = [];
    var mobile = [];
    var chunksize = 9;
    var pages = [];
    var nextp = [];
    Product.find({
        category: 'accessories'
    }, (err, docs) => {
        for (var i = 9; i < docs.length; i += chunksize) {
            mobile.push(docs.slice(i, i + chunksize));
        };
        nextp.push({
            nxt: "content-page" + (mobile.length + 1)
        });

        firstchunk.push(docs.slice(0, chunksize));
        for (var i = 1; i <= mobile.length; i++) {

            var page = {
                pagenum: i + 1,
                pageId: "page" + (i + 1),
            }
            pages.push(page);
        }
        res.send({
            firstchunk: firstchunk,
            product: mobile,
            page: pages,
            prev: "content-page1",
            nextp: nextp
        });
    });
});

module.exports = router;