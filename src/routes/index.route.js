const router = require("express").Router()
const userRouter = require('./user.route')
const workspaceRouter = require('./workspace.route')
const commentRouter = require('./comment.route')
const testmiddleware = require('../middlewares/test.middleware')
const { fetchAllWorkspaces } = require("../controllers/workspace.controller")
const { fetchAllComments } = require("../controllers/comment.controller")


router.get('/users/:@username/workspaces/', testmiddleware, fetchAllWorkspaces)
router.get('/users/:@username/workspaces/:id/comments/', testmiddleware, fetchAllComments)
router.get('/docs', (req, res) => res.redirect('https://documenter.getworkspaceman.com/view/19026826/2s93JtRPcU'))

router.use('/users', testmiddleware, userRouter)
router.use('/users/:id/workspaces', testmiddleware, workspaceRouter)
router.use('/users/:id/workspaces/:id/comments', testmiddleware, commentRouter)


module.exports = router;