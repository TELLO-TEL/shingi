var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required:true},
    shortDescription: {type: String, required:true},
    fullDescription: {type: String, required:true},
    image: {type: Object,},
    imageSV: {type: Object,},//side view
    imageFV: {type: Object,},//front view
    imageBV: {type: Object,},//back view
    price: {type: Number, required:true},
    review: {type: Number},
    category: {type: String, required:true},
    brand: {type: String, required:true},
    quantity:{type: Number}
});

module.exports = mongoose.model('Product', schema);
