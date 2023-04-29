const { ObjectId } = require('mongoose').Types;
const{ User, Thought } = require('../models');

// Function to get total number of users
const headCount = async () => {
    const numberOfUsers = await User.aggregate()
    .count('userCount');
    return numberOfUsers;
}

module.exports = {
    // Get all Users
    async getUsers(req, res) {
        try {
            const users = await User.find();

            const userObj = {
                users,
                headCount: await headCount(),
            };

            res.json(userObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Get a single user
    //*********NEED TO CHECK */
async getSingleUser(req, res) {
    try {
        const user = await User.findOne({ _id: req.params.studentId })
          .select('-__v');

          if (!user) {
            return res.status(404).json({ message: 'No use with that ID found!'})
          }

          res.json({
            user,
            thoughts: await thoughts(req.params.userId),
            friends: await friends(req.params.userId),
            reactions: await reactions(req.params.userId),
          });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
},

// Create new user
// ********CHECK****
async createUser(req, res) {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
},

// Delete a user and remove their thoughts and reactions
async deleteUser(req, res) {
    try {
        const user = await User.findOneAndRemove({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID!' });
            }

    }
},
   // removing thoughts 🤯
            // ***** CHECK THIS ******
         const thought = await Thought.findOneAndUpdate(
            { users: req.params.userId },
            { $pull: { user: req.params.userId } },
            { new: true }
         );

         if (!thought) {
            return res.status(404).json({
                message: 'User deleted but they were devoid of thought!',
            });
         }

        res.json({ message: 'User succesfully deleted!' });
    } catch (err) {
        console.log(err);
        this.res.status(500).json(err);
    }
