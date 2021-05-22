const { Schema, model } = require("mongoose");

//User schema to define the user object
const CategorySchema = Schema({
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
    }
});

CategorySchema.methods.toJSON = function() {
    const { status, ...data } = this.toObject();
    return data;
};

module.exports = model('Category', CategorySchema);