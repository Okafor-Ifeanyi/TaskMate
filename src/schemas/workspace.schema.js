const joi = require('joi')

// Joi Validation schema used to verify req data
const WorkspaceSchema = joi.object()
    .keys({
        title: joi.string().required().max(280),
        handles: joi.array().items(joi.string().required().email())
    })

module.exports = WorkspaceSchema