const WorkspaceService = require('../services/workspace.service')
const boardService = require('../services/board.service')
// const { isAdmin } = require("../middlewares/auth.middleware")
const { decodeToken } = require("../utils/jwt.util")


class boardController {
    
    // create a board
    async createBoard(req, res){
        const info = req.body;
        let token = req.params.token;

        // const token = req.params.token
        

        try{
            // Verify workspace
            const workspace = await WorkspaceService.findbyID({ _id: info.workspaceID, deleted: false });
            
            if (!workspace){
                throw { status: 404, message: 'Workspace not found' };
            }

            // extract token and get current user
            token = req.headers.authorization.split(' ')[1]
            const currentUser_id = decodeToken(token)

            const ownerID = currentUser_id;
            
            const newboard = await boardService.createboard({...info, ownerID})
            // const newboard = await boardService.createboard(info)
            // Success Alert
            return res.status(200).json({ success: true, message: 'Board created', data: newboard })
        } catch (error) {
            return res.status(403).json({ success: false, message: error })           
        }
        
    }

    // Update a user
    async updateBoard(req, res){ 
        const infoID = req.params.id
        const updateData = req.body
        let token = req.params.token;

        try{
            // Verify board
            const board = await boardService.findbyID({ _id: infoID, deleted: false })

            if(!board) {
                throw { status: false, message: 'Board not found' };
            }

            // extract token and get current user
            token = req.headers.authorization.split(' ')[1]
            const currentUser_id = decodeToken(token)
            
            // Authorize only admin and owner of acc to feature
            if ( currentUser_id == board.ownerID) {
                const updatedData = await boardService.update(infoID, updateData) //  Updates board
                return res.status(200).json({ 
                    success: true, 
                    message: 'Body updated successfully', 
                    data: updatedData })
            } else {
                    res.status(403).json({ success: false, message: 'Unauthorized User' })
            }
        } catch (error) {
            return res.status(403).json({ success: false, message: error })                       
        }
        
    }

    // Delete a single board
    async deleteBoard(req, res) {
        const boardID = req.params.id
        let token = req.params.token;
        
        try{
            // Check if the board is the database except deleted
            const category = await boardService.findbyID({ _id: boardID, deleted: false });

            if (!category || category.deleted == true) {
                throw { success: false, message: 'board does not exist'}
            }
            // extract token and get current user
            token = req.headers.authorization.split(' ')[1]
            const currentUser_id = decodeToken(token)
            
            // Authorize only admin and owner of acc to feature
            if ( currentUser_id == category.ownerID ) { 
                await boardService.update(boardID, { deleted: true }); // <= change delete status to 'true'
                res.status(200).json({ 
                    success: true, 
                    message: 'Workspace deleted successfully'});
            } else {
                res.status(403).json({ success: false, message: 'Unauthorized User' })
            }
        } catch (error) {
            res.status(403).json({ success: false, message: error })                       
        }
        
    }


    // Fetch a single board by ID
    async getOneBoard(req, res){
        const infoID = req.params.id
        
        // Check if the board is the database except deleted
        try{
            const existingboard = await boardService.findbyID({
                _id: infoID, deleted: false
            })

            if (!existingboard) {
                throw { success: false, message: 'board does not not exist'}

            } else {
                res.status(201).json({ success: true, message: 'board Fetched successfully', data: existingboard })
            }
        } catch (error) {
            res.status(403).json({ success: false, message: error })                       
        }
        
    }

    // Fetch all boards in the db
    async fetchAllBoards(req, res){
        // Check if the board is the database except deleted
        try{
            const existingboard = await boardService.getAll({deleted: false})

            res.status(200).json({ success: true, message: 'board fetched successfully', data: existingboard }) 
        } catch (error) {
            res.status(403).json({ success: false, message: error })                       
        }
        
    }

    // Fetch all deleted boards in the db
    async deletedBoards(req, res){
        // Check if the board is the database except deleted
        try{
            const existingboard = await boardService.getAll({deleted: true})

            res.status(200).json({ success: true, message: 'board fetched successfully', data: existingboard })
        } catch (error) {
            res.status(403).json({ success: false, message: error })                       
        }
       
    }
}

module.exports = new boardController()