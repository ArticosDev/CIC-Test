const { Schema, model } = require("mongoose");

//Product schema to define the product object
const ProductSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    offertPrice: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});

ProductSchema.methods.toJSON = function() {
    const { status, ...data } = this.toObject();
    return data;
};

module.exports = model('Product', ProductSchema);