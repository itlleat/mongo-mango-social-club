// Dependencies
const { Schema, model, Types } = require('mongoose');
const validate = require('mongoose-validator');
const reactionSchema = require('./Reaction');
const formatDate = require('../utils/formatDate');

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
            min_length: 1,
            max_length: 280,
        },

        // createdAt
        // Date
        // Set default value to the current timestamp
        // Use a getter method to format the timestamp on query

        createdAt: {
            type: Date,
            default: Date.now,
            // get: createdAt => formatDate(createdAt)
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
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Schema Settings:
// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
// ** Need to finish! **

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  }
  );
  const Thought = model('thought', thoughtSchema);
  
  module.exports = Thought;



