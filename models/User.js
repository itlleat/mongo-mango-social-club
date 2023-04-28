// Dependencies
const { Schema, model } = require('mongoose');
const thoughtschema = require('./Thought');


// Schema to create User model

const userSchema = new Schema(
    {
        // *Username*
        username: {
            // string
            type: String,
            // unique
            unique: true,
            // required
            required: true,
            // trimmed
            trimmed: true,
        },

        // *Email*
        email: {
            // string
            type: String,
            // unique
            unique: true,
            // required
            required: true,
            // must match a valid email - look into mongoose matching validation ** TODO **

        },

        // *Thoughts*
        // array of _id values referencing the Thought model
        thoughts: [thoughtSchema],

        // *friends* 
        // array of _id values referencing the User model - self -reference  
        friends: [userSchema],

    },
    {
        toJSON: {
            getters: true,
        },
    }
);

// Schema Settings:
// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
// **NEED TO FINISH**

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;