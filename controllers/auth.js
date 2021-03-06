const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../utilities/jwt');

//Create a new user
const crearUsuario = async(req, res = response) => {

    const { email, name, password } = req.body;

    try {

        //Verify if the email already register
        console.log(email);
        const usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe.'
            });
        }

        // Create dbUser following the Usuario Model schema
        const dbUser = new Usuario(req.body);

        //Hash Password
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password, salt);

        //Generate JWT
        const token = await generarJWT(dbUser.id);

        //Save dbUser in Database
        await dbUser.save();

        //Generate a success response after everything is done
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            email,
            token,
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor.'
        });
    }




}

//Login the user
const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //Check if the email is already register
        const dbUser = await Usuario.findOne({ email });
        if (!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales invalidas.'
            });
        }

        //Check the password
        const validPassword = bcrypt.compareSync(password, dbUser.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales invalidas.'
            });
        }

        //Generate token
        const token = await generarJWT(dbUser.id);

        //Return after the token was created succesfully
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            email,
            token
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor.'
        });
    }
}

const revalidarToken = async(req, res = response) => {

    const { uid } = req;

    //Read Database for user information
    const dbUser = await Usuario.findById(uid);

    //Generate JWT
    const token = await generarJWT(uid);

    return res.json({
        ok: true,
        uid,
        name: dbUser.name,
        email: dbUser.email,
        token,
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}