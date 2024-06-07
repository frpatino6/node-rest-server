const { response, request } = require('express');

const userGet = (req = request, res = response) => {
    const { nombre, apellido, edad } = req.query;
    res.json({
        msg: "Get Api controller!!!",
        nombre, 
        apellido, 
        edad
    });
}

const userPost = (req = request, res = response) => {

    const { nombre, edad } = req.body;

    res.json({
        msg: "Post Api controller!!!",
        nombre,
        edad
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