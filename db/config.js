const mongoose = require("mongoose");

//Connection to mongoDB
const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.BD_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        console.log('db connected.');

    } catch (error) {
        console.log(error);
        throw new Error('Error db connection.');
    }
}

module.exports = {
    dbConnection
}