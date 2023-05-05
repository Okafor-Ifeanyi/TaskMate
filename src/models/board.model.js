const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const boards = new Schema({
    title: { 
        type: 'string',
        required: [true, "title needed to create board"], 
        maxLength: 280 
    },
    ownerID: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true,
    },
    workspaceID : {
        type: Schema.Types.ObjectId,
        ref: 'WorkspaceModel',
        required: true, 
    },
    deleted: {
        type: "boolean",
        default: false,
        required: true,
    }
},  { timestamps: true })

boardModel = mongoose.model('board', boards)
module.exports = boardModel