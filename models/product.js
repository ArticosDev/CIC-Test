const { Schema, model } = require("mongoose");

//Product schema to define the product object
const ProductSchema = Schema({
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    cod: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    offertPrice: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
});

ProductSchema.methods.toJSON = function() {
    const {...data } = this.toObject();
    return data;
};

module.exports = model('Product', ProductSchema);