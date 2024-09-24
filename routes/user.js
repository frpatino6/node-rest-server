const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const {
    userGet,
    userPost,
    userDelete,
    userPatch,
    userPut
} = require('../controllers/user');

const router = Router();

router.get('/', userGet);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], userPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('correo').custom(emailExiste),
    check('correo').isEmail(),
    check('rol').custom(esRoleValido),
    validarCampos
], userPost);

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),  
    validarCampos
],userDelete);

router.patch('/', userPatch);

module.exports = router;