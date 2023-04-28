// Dependencies
const { Schema, model } = require('mongoose');
const validate = require('mongoose-validator');

// Thought:
const thoughtSchema = new Schema(
    {
        // thoughtText
        // String
        // Required
        // Must be between 1 and 280 characters


        thoughtText: {
            type: String,
            required: true,
            var lengthValidator = [
                Validate({
                    validator: 'isLength',
                    arguments: [1, 280],
                    message: 'Thoughts must be between 1 and 280 characters!'
                })
            ],
        },

        // createdAt
        // Date
        // Set default value to the current timestamp
        // Use a getter method to format the timestamp on query

        createdAt: {
            type: Date,
            default: Date.now,
            get: function (timestamp) {
                return timestamp.toLocaleString();
            }
        },


        // username (The user that created this thought)

        // String
        // Required


        username: {
            type: String,
            required: true,
        },


        // reactions (These are like replies)
        // Array of nested documents created with the reactionSchema

        reactions: [reactionSchema]

    },
    // ***LOOK AT THIS***
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

// Schema Settings:
// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
// ** Need to finish! **

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Reaction (SCHEMA ONLY)

const reactionSchema = new Schema(
    {

        // reactionId*

        // Use Mongoose's ObjectId data type
        // Default value is set to a new ObjectId

        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId(),
            required: true
        },


        // reactionBody*

        // String
        // Required
        // 280 character maximum

        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },


        // username*

        // String
        // Required


        username: {
            type: String,
            required: true
        },


        // createdAt*

        // Date
        // Set default value to the current timestamp
        // Use a getter method to format the timestamp on query

        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => {
                return new Date(timestamp).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true
                });
            }
        }

    });



// This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.

module.exports = reactionSchema;