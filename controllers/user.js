const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const userGet = (req = request, res = response) => {
    const { nombre, apellido, edad } = req.query;
    res.json({
        msg: "Get Api controller!!!",
        nombre,
        apellido,
        edad
    });
}

const userPost = async (req = request, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    
    const usuario = new Usuario({
        nombre,
        correo,
        password,
        rol
    });
    
    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        return res.status(400).json({
            msg: "El correo ya esta registrado"
        });
    }

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar en base de datos
    await usuario.save();

    res.json({
        usuario
    });
}

const userPut = (req, res = response) => {
    const id = req.params.id;

    res.json({
        msg: "Put Api controller!!!",
        id
    });
}
const userDelete = (req, res = response) => {
    res.json({
        msg: "Delete Api controller!!!"
    });
}

const userPatch = (req, res = response) => {
    res.json({
        msg: "Patch Api controller!!!"
    });
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch
}