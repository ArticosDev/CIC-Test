const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {

    //Payload for sing
    const payload = { uid };


    return new Promise((resolve, reject) => {

        //Generate token with JWT
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(token);
            }

        });
    });

}



module.exports = {
    generarJWT
}