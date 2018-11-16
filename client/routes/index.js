const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Order = require('../models/order');
const Cart = require('../models/cart');
const axios = require('axios');
/* GET home page. */
router.get('/checkout', isLoggedIn, function (req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }

    var cart = new Cart(req.session.cart);
    res.render('pages/checkout', {
        product: cart.generateArray(),
        totalPrice: cart.totalPrice
    });
});

router.post('/checkout', isLoggedIn, function (req, res, next) {

    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var fields = {
        user: req.user,
        cart: cart,
        country: req.body.country,
        address: req.body.address,
        deliveryAddress: req.body.deliveryAddress,
        email: req.body.email,
        company: req.body.company,
        name: req.body.name,
        surname: req.body.surname,
        value: req.body.orderPrice
    }

    // implement pay now here
    var order = new Order(fields);
    order.save(function (err, result) {
        if (err) {
            console.log(err);
            res.redirect('/checkout');
        }
        req.flash('success', 'Succesfully placed order!');
        req.session.cart = null;
        res.redirect('/');
    });
});

router.get('/', function (req, res, next) {
     var productschun = [];
     var trending = [];
     var smartphone1 = [];
     var smartphone2 = [];
     var laptop1 = [];
     var laptop2 = [];
     var accessories1 = [];
     var accessories2 = [];
     var featured = [];

     axios.get('http://localhost:3080/mobile-shop')
         .then((response) => {
             trending.push(response.data.firstchunk[0].slice(1, 9));
             featured.push(response.data.firstchunk[0].slice(1, 2));
             smartphone1.push(response.data.firstchunk[0].slice(1, 5));
             smartphone2.push(response.data.firstchunk[0].slice(5, 9));
         })
         .catch((error) => {
             console.log(error);
         });
     axios.get('http://localhost:3080/laptop-shop')
         .then((response) => {
             laptop1.push(response.data.firstchunk[0].slice(1, 5));
             laptop2.push(response.data.firstchunk[0].slice(5, 9));
         })
         .catch((error) => {
             console.log(error);
         });
     axios.get('http://localhost:3080/accessories-shop')
         .then((response) => {
             accessories1.push(response.data.firstchunk[0].slice(1, 5));
             accessories2.push(response.data.firstchunk[0].slice(5, 9));
             res.render('pages/home', {
                 product: productschun,
                 trending: trending,
                 featured: featured,
                 smartphone1: smartphone1,
                 smartphone2: smartphone2,
                 laptop1: laptop1,
                 laptop2: laptop2,
                 watch1: accessories1,
                 watch2: accessories2

             });
         })
         .catch((error) => {
             console.log(error);
         });
});

router.get('/home', function (req, res, next) {
    var productschun = [];
    var trending = [];
    var smartphone1 = [];
    var smartphone2 = [];
    var laptop1 = [];
    var laptop2 = [];
    var accessories1 = [];
    var accessories2 = [];
    var featured = [];

    axios.get('http://localhost:3080/mobile-shop')
        .then((response) => {
            trending.push(response.data.firstchunk[0].slice(1, 9));
            featured.push(response.data.firstchunk[0].slice(1, 2));
            smartphone1.push(response.data.firstchunk[0].slice(1, 5));
            smartphone2.push(response.data.firstchunk[0].slice(5, 9));
        })
        .catch((error) => {
            console.log(error);
        });
    axios.get('http://localhost:3080/laptop-shop')
        .then((response) => {
            laptop1.push(response.data.firstchunk[0].slice(1, 5));
            laptop2.push(response.data.firstchunk[0].slice(5, 9));
        })
        .catch((error) => {
            console.log(error);
        });
    axios.get('http://localhost:3080/accessories-shop')
        .then((response) => {
            accessories1.push(response.data.firstchunk[0].slice(1, 5));
            accessories2.push(response.data.firstchunk[0].slice(5, 9));
            res.render('pages/home', {
                product: productschun,
                trending: trending,
                featured: featured,
                smartphone1: smartphone1,
                smartphone2: smartphone2,
                laptop1: laptop1,
                laptop2: laptop2,
                watch1: accessories1,
                watch2: accessories2

            });
        })
        .catch((error) => {
            console.log(error);
        });

    
});

router.get('/about', function (req, res, next) {
    res.render('pages/about');
});

router.get('/add-to-cart/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {
        items: {}
    });
    Product.findById(productId, (err, product) => {
        if (err) {
            return res.redirect(req.headers.referer);
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        res.redirect(req.headers.referer);
    })
});

router.get('/add1-to-cart/:id', function (req, res, next) {
    router.use((req, res, next) => {
        req.session.referrer = req.protocol + '://' + req.get('host') + req.originalUrl;
        next();
    });
    if (req.session.referrer) console.log(req.session.referrer);

    var productId = req.params.id;
    var qnty = parseInt(req.body.quantity);
    console.log(req.body.quantity);
    var cart = new Cart(req.session.cart ? req.session.cart : {
        items: {}
    });
    Product.findById(productId, (err, product) => {
        if (err) {
            return res.redirect(req.headers.referer);
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        res.redirect(req.headers.referer);
    })
});

router.get('/sub-to-cart/:id', (req, res, next) => {
    var id = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.sub(id);
    req.session.cart = cart;
    res.redirect(req.headers.referer);
});

router.get('/remove-to-cart/:id', (req, res, next) => {
    var id = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.remove(id);
    req.session.cart = cart;
    res.redirect(req.headers.referer);
});

router.get('/shopping-cart', (req, res, next) => {
    if (!req.session.cart) {
        return res.render('pages/cart', {
            product: null
        });
    }
    var cart = new Cart(req.session.cart);
    res.render('pages/cart', {
        product: cart.generateArray(),
        totalPrice: cart.totalPrice
    })
})

router.get('/contact', function (req, res, next) {
    res.render('pages/contact');
});

router.get('/detail-view/:id', function (req, res, next) {

    var productId = req.params.id;

    Product.findById(productId, (err, product) => {
        if (err) {
            return res.redirect('/');
        }
        console.log(product);
        res.render('pages/detailview', {
            layout: 'layout_2',
            product: product
        });
    })

});

router.get('/grid-view', function (req, res, next) {
    axios.get('http://localhost:3080/shop')
        .then((response) => {
            response.data.product.forEach(function (obj, i) {
                obj.pagecontent = "content-page" + (i + 2);
            });
            res.render('pages/gridview_laptop', {
                firstchunk: response.data.firstchunk,
                product: response.data.product,
                page: response.data.page,
                prev: response.data.prev,
                nextp: response.data.nextp
            });
        })
        .catch((error) => {
            console.log(error);
        })

});

router.get('/list-view', function (req, res, next) {
    axios.get('http://localhost:3080/shop')
        .then((response) => {
            response.data.product.forEach(function (obj, i) {
                obj.pagecontent = "content-page" + (i + 2);
            });
            res.render('pages/listview_laptop', {
                firstchunk: response.data.firstchunk,
                product: response.data.product,
                page: response.data.page,
                prev: response.data.prev,
                nextp: response.data.nextp
            });
        })
        .catch((error) => {
            console.log(error);
        })

});

router.get('/laptop-shop-grid-view', function (req, res, next) {
    axios.get('http://localhost:3080/laptop-shop')
        .then((response) => {
            response.data.product.forEach(function (obj, i) {
                obj.pagecontent = "content-page" + (i + 2);
            });
            res.render('pages/gridview_laptop', {
                firstchunk: response.data.firstchunk,
                product: response.data.product,
                page: response.data.page,
                prev: response.data.prev,
                nextp: response.data.nextp
            });
        })
        .catch((error) => {
            console.log(error);
        })

});

router.get('/laptop-shop-list-view', function (req, res, next) {
    axios.get('http://localhost:3080/laptop-shop')
        .then((response) => {
            response.data.product.forEach(function (obj, i) {
                obj.pagecontent = "content-page" + (i + 2);
            });
            res.render('pages/listview_laptop', {
                firstchunk: response.data.firstchunk,
                product: response.data.product,
                page: response.data.page,
                prev: response.data.prev,
                nextp: response.data.nextp
            });
        })
        .catch((error) => {
            console.log(error);
        })

});

router.get('/mobile-shop-grid-view', function (req, res, next) {
    axios.get('http://localhost:3080/mobile-shop')
        .then((response) => {
            response.data.product.forEach(function (obj, i) {
                obj.pagecontent = "content-page" + (i + 2);
            });
            res.render('pages/gridview_mobile', {
                firstchunk: response.data.firstchunk,
                product: response.data.product,
                page: response.data.page,
                prev: response.data.prev,
                nextp: response.data.nextp
            });
        })
        .catch((error) => {
            console.log(error);
        })

});

router.get('/mobile-shop-list-view', function (req, res, next) {
    axios.get('http://localhost:3080/mobile-shop')
        .then((response) => {
            response.data.product.forEach(function (obj, i) {
                obj.pagecontent = "content-page" + (i + 2);
            });
            res.render('pages/listview_mobile', {
                firstchunk: response.data.firstchunk,
                product: response.data.product,
                page: response.data.page,
                prev: response.data.prev,
                nextp: response.data.nextp
            });
        })
        .catch((error) => {
            console.log(error);
        })

});


module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/user/signin');
}