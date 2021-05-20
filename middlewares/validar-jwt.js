const { response } = require("express");
const jwt = require('jsonwebtoken');


const validarJWT = (req, res = response, next) => {

    const token = req.header('x-token');

    //Check if the token already exist
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'error Token.'
        });
    }

    try {
        //Verify with the Seed if is a valid token
        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'error Token no valido.'
        });
    }


    next();
}

module.exports = {
    validarJWT
}