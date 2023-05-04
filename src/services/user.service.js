const userModel = require('../models/user.model')

class UserService {

    // register a user model
    async createUser(user) {
        return await userModel.create(user)
    }

    // Edit a user
    async update(id, userData) {
        return await userModel.findByIdAndUpdate(id, userData, { 
            new: true
        })
    }

    // Delete a user
    async delete(filter){
        return await userModel.findByAndDelete(id)
    }

    // find a user by their id
    async findbyID(filter){
        return await userModel.findOne(filter)
    } 

    // Get all users 
    async getAll(filter) {
        return await userModel.find(filter)
    }
}

module.exports = new UserService()