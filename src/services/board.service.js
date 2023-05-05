const boardModel = require('../models/board.model')

class boardService {
    // create a new board
    async createboard(board) {
        return await boardModel.create(board)
    }

    // Edit aa board
    async update(id, userData) {
        return await boardModel.findByIdAndUpdate(id, userData), {
            new: true
        }
    }
    
    // find a boards by their id
    async findbyID(filter){
        return await boardModel.findOne(filter)
    }

    // Get all boards
    async getAll(filter) {
        return await boardModel.find(filter)
    }

    // Get all boards by a user
    async getAllByUser(user, filter) {
        return await boardModel.find(filter, user)
    }
}

module.exports = new boardService()