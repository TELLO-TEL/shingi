var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    title: {type: String, required:true},
    shortDescription: {type: String, required:true},
    fullDescription: {type: String, required:true},
    image: { data: Buffer, contentType: String },
    imageSV: { data: Buffer, contentType: String },//side view
    imageFV: { data: Buffer, contentType: String },//front view
    imageBV: { data: Buffer, contentType: String },//back view
    price: {type: Number, required:true},
    review: {type: Number},
    category: {type: String, required:true},
    brand: {type: String, required:true}
});

module.exports = mongoose.model('Product', schema);
