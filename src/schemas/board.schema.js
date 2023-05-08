const joi = require('joi')

// Joi Validation schema used to verify req data
const BoardSchema = joi.object()
    .keys({
        title: joi.string().required().max(280),
        // workspaceID: joi.string().required().length(24)

    });

module.exports = BoardSchema