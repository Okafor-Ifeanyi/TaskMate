const workspaceModel = require('../models/workspace.model')

class WorkspaceService {
    // create a new workspace
    async createWorkspace(workspace) {
        return await workspaceModel.create(workspace)
    }

    // Edit aa workspace
    async update(id, userData) {
        return await workspaceModel.findByIdAndUpdate(id, userData), {
            new: true
        }
    }
    
    // find a workspaces by their id
    async findbyID(filter){
        return await workspaceModel.findOne(filter)
    }

    // Get all workspaces
    async getAll(filter) {
        return await workspaceModel.find(filter)
    }

    // Get all workspaces by a user
    async getAllByUser(user, filter) {
        return await workspaceModel.find(filter, user)
    }
}

module.exports = new WorkspaceService()