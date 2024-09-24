const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const userGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const[total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))]);

    return res.json({
        total,
        usuarios
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

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar en base de datos
    await usuario.save();

    res.json({
        usuario
    });
}

const userPut = async (req, res = response) => {
    const id = req.params.id;
    const { _id, password, google, correo, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });
    console.log(usuario);

    res.json({
        msg: usuario,
        id
    });
}
const userDelete = async (req, res = response) => {
    const { id } = req.params;

     const usuario = await Usuario.findByIdAndUpdate(id, { estado: false }); 
     
    res.json({
       usuario
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