const router = require('express').Router()
const validate = require('../middlewares/validate.middleware')
const { RegisterSchema , LoginSchema, UpdateSchema } = require("../schemas/user.schema")
const { isAuth, isAdmin } = require("../middlewares/auth.middleware")

const { login,
    createUser,
    updateUser,
    deleteUser,
    getUserbyEmail,
    getOneUser,
    fetchAll,
    deleted } = require('../controllers/user.controller')

// routers for user
router.get('/deleted', isAuth, isAdmin, deleted);
router.get('/@:email', getUserbyEmail);
router.get('/:id', getOneUser);
router.get('/', fetchAll);
router.post('/', validate(RegisterSchema), createUser);
router.post('/login/', validate(LoginSchema), login);
router.patch('/:id', validate(UpdateSchema), isAuth, updateUser);
router.delete('/:id', isAuth, deleteUser);


module.exports = router 