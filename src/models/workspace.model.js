const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Workspaces = new Schema({
    title: { 
        type: 'string',
        required: [true, "title needed to create workspace"], 
        maxLength: 280 
    },
    handles: {
        type: Array,
        of: String,
        required: [true, "At least 1 handle needed"]
    },
    ownerID: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true,
    },
    deleted: {
        type: "boolean",
        default: false,
        required: true,
    }
},  { timestamps: true })

WorkspaceModel = mongoose.model('Workspace', Workspaces)
module.exports = WorkspaceModel