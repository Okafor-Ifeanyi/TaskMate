const router = require('express').Router()
const validate = require('../middlewares/validate.middleware')
const BoardSchema = require("../schemas/board.schema")
const { isAuth, isAdmin } = require("../middlewares/auth.middleware")

const { 
    createBoard,
    updateBoard,
    deleteBoard,
    getOneBoard,
    fetchAllBoards,
    deletedBoards } = require('../controllers/board.controller')

// routers for workspace
router.get('/del/', isAuth, isAdmin, deletedBoards)
router.get('/:id', getOneBoard)
router.get('/', fetchAllBoards)
router.post('/', validate(BoardSchema), isAuth, createBoard)
router.patch('/:id', validate(BoardSchema), isAuth, updateBoard)
router.patch('/del/:id', isAuth, deleteBoard)


module.exports = router