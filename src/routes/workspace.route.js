const router = require('express').Router()
const validate = require('../middlewares/validate.middleware')
const WorkspaceSchema = require("../schemas/workspace.schema")
const { isAuth, isAdmin } = require("../middlewares/auth.middleware")

const { 
    createWorkspace,
    updateWorkspace,
    deleteWorkspace,
    getOneWorkspace,
    fetchAllWorkspaces,
    deletedWorkspaces } = require('../controllers/workspace.controller')

// routers for workspace
router.delete('/:id', isAuth, deleteWorkspace)
router.get('/del', isAuth, isAdmin, deletedWorkspaces)
router.get('/:id', getOneWorkspace)
router.get('/', fetchAllWorkspaces)
router.post('/', validate(WorkspaceSchema), isAuth, createWorkspace)
router.patch('/:id', validate(WorkspaceSchema), isAuth, updateWorkspace)


module.exports = router