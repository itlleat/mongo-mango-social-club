const { Schema, Types } = require('mongoose');
const formatDate = require('../utils/formatDate');

const reactionSchema = new Schema(
    {

        // reactionId*

        // Use Mongoose's ObjectId data type
        // Default value is set to a new ObjectId

        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },



        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },





        username: {
            type: String,
            required: true
        },




        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAt => formatDate(createdAt)
        },
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);



// This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.

module.exports = reactionSchema;