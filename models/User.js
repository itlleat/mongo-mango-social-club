// Dependencies
const { Schema, model, Types } = require('mongoose');



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
            trim: true,
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
            validate: {
                validator: function(v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: props => `${props.value} is not a valid email address!`
            },
        },

        // *Thoughts*
        // array of _id values referencing the Thought model
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
);

// Schema Settings:
// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
// **NEED TO FINISH**

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;