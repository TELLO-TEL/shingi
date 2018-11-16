const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const passport = require('passport');
const Order = require('../models/order');
const Product = require('../models/product');
const Cart = require('../models/cart');

var csrfProtect = csrf();
router.use(csrfProtect);

/* GET users listing. */

router.get('/profile', isLoggedIn, (req, res, next) => {
  Order.find({user: req.user}, (err, orders)=>{
    if(err){
      return res.write('Error!');
    }
    var cart;
    orders.forEach((order)=>{
      cart = new Cart(order.cart);
      order.items = cart.generateArray();
    })
    res.render('user/profile', {
      layout: 'layout_2',
      order: orders
    })
  });
});

router.get('/admin', isLoggedIn, (req, res, next) => {
   var productId = req.params.id;

   Product.findById(productId, (err, product) => {
     if (err) {
       return res.redirect('/');
     }
     console.log(product);
     res.render('admin/admin', {
       layout: 'layout_2',
       product: product
     });
   })
});

router.get('/logout', isLoggedIn, (req, res, next) => {
  req.logout();
  res.redirect('/');
});


//not logged in users
router.use('/', notLoggedIn, (req, res, next)=>{
  next();
})

router.get('/signup', function (req, res, next) {
  var message = req.flash('error');
  res.render('user/signup', {
    csrfToken: req.csrfToken(),
    layout: 'registration',
    message: message,
    hasErrors: message.length > 0
  });
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/home',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

router.get('/signin', (req, res, next) => {
  var message = req.flash('error');
  res.render('user/signin', {
    csrfToken: req.csrfToken(),
    layout: 'registration',
    message: message,
    hasErrors: message.length > 0
  });
})

router.post('/signin', passport.authenticate('local.signin', {
  successRedirect: '/home',
  failureRedirect: '/user/signin',
  failureFlash: true
}));


module.exports = router;

function isLoggedIn(req, res , next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
function notLoggedIn(req, res , next){
  if (!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}