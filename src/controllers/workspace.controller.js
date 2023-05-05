const WorkspaceService = require('../services/workspace.service') 
const { decodeToken } = require("../utils/jwt.util") 



class WorkspaceController {
    
    // create a workspace
    async createWorkspace(req, res){
        const info = req.body;
        let token = req.params.token;

        // Validate and verify Workspace (Twitter Tweet Standard)
        try{
            // Verify workspace
            const workspace = await WorkspaceService.findbyID({ workspace: info.workspace, deleted: false })
            if (workspace){
                throw { status: 403, message: 'Workspace already exists' };
            }

            // extract token and get current user
            token = req.headers.authorization.split(' ')[1]
            const currentUser_id = decodeToken(token)

            // Owner ID == current user (If you think about it)
            const ownerID = currentUser_id
            
            // Create workspace
            const newWorkspace = await WorkspaceService.createWorkspace({...info, ownerID})
            // Success Alert
            return res.status(200).json({ success: true, message: 'Workspace created', data: newWorkspace })
        } 
        catch (error) {
            return res.status(403).json({ success: false, message: error })           
        }
    }

    // Update a user
    async updateWorkspace(req, res){ 
        const infoID = req.params.id
        const updateData = req.body
        let token = req.params.token;
        

        try {
            // check if workspace exists
            const workspace = await WorkspaceService.findbyID({ _id: infoID, deleted: false })

            // If workspace not found throw error
            if (!workspace) {
                throw { status: 404, message: 'Workspace not found' };
            }

            // Since the username is a unique key, we have to make it consistent 
            if (workspace) {
                const available = await WorkspaceService.findbyID({ workspace: updateData.workspace, deleted: false })

                // throws an error if the username selected is taken
                if (available){ 
                    return res.status(403).json({ success: false, message: 'Workspace with update name already exists'})
                }
            }

            // extract token and get current user
            token = req.headers.authorization.split(' ')[1]
            const currentUser_id = decodeToken(token)
            
            const ownerID = workspace.ownerID.toString()
            // Authorize only admin and owner of acc to feature
            if ( currentUser_id == ownerID ) {
                const updatedData = await WorkspaceService.update(infoID, updateData)

                return res.status(200).json({ 
                    success: true, 
                    message: 'Body updated successfully', 
                    data: updatedData })
                    
            } else {
                res.status(403).json({ success: false, message: 'Unauthorized User' })
            }
            
        } catch (error) {
            return res.status(403).json({ success: false, error: error })
        }        
    }

    // Delete a single workspace
    async deleteWorkspace(req, res) {
        const workspaceID = req.params.id
        let token = req.params.token;
        
        try {
            // Check if the workspace is the database except deleted
            const category = await WorkspaceService.findbyID({ _id: workspaceID, deleted: false });
            
            if (!category || category.deleted == true) {
                throw { success: false, message: 'workspace does not exist'}
            } 

            // extract token and get current user
            token = req.headers.authorization.split(' ')[1]
            const currentUser_id = decodeToken(token)
            
            // Authorize only admin and owner of acc to feature
            if ( currentUser_id == category.ownerID ) {
                await WorkspaceService.update(workspaceID, { deleted: true }); // <= change delete status to 'true'
                return res.status(200).json({ success: true, message: 'Workspace deleted successfully'});
            } else{
                res.status(403).json({ success: false, message: 'Unauthorized User' })
            }
        } 
        catch (error) {
            res.status(403).json({ success: false, message: error })                       
        }
    }


    // Fetch a single Workspace by ID
    async getOneWorkspace(req, res){
        const infoID = req.params.id

        // Check if the workspace is the database except deleted
        try{
            const existingworkspace = await WorkspaceService.findbyID({
                _id: infoID, deleted: false
            })

            if (!existingworkspace) {
                throw { success: false, message: 'Workspace does not not exist'}

            } else {
                res.status(201).json({ success: true, message: 'Workspace Fetched successfully', data: existingworkspace })
            }
        } catch (error) {
            res.status(403).json({ success: false, message: error })                       
        }
    }

    // Fetch all workspaces in the db
    async fetchAllWorkspaces(req, res){
        try{
            const existingWorkspace = await WorkspaceService.getAll({deleted: false})
            res.status(200).json({ success: true, message: 'comment fetched successfully', data: existingWorkspace }) 

        } catch (error) {
            res.status(403).json({ success: false, message: error })                       
        }
    }

    // Fetch all deleted workspaces in the db
    async deletedWorkspaces(req, res){
        // Check if the comment is the database except deleted
        try{
            const existingWorkspace = await WorkspaceService.getAll({deleted: true})

            res.status(200).json({ success: true, message: 'Workspace fetched successfully', data: existingWorkspace})
        } catch (error) {
            res.status(403).json({ success: false, message: error })                       
        }
    }
}

module.exports = new WorkspaceController()