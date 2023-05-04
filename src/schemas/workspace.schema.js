const joi = require('joi')

// Joi Validation schema used to verify req data
const WorkspaceSchema = joi.object()
    .keys({
        workspace: joi.string().required().max(280)
    });

module.exports = WorkspaceSchema