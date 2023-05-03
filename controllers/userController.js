// const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Function to get total number of users
// const headCount = async () => {
//     const numberOfUsers = await User.aggregate()
//     .count('userCount');
//     return numberOfUsers;
// }

module.exports = {
    // Get all Users
    async getUsers(req, res) {
        try {
            // const users = await User.find();

            // const userObj = {
            //     users,
            //     headCount: await headCount(),
            // };
            const user = await User.find()
                .populate({
                    path: 'thoughts',
                    select: '-__v'
                })
                .select('-__v')
                .sort({ _id: 1 });
            res.Json(user);

            // res.json(userObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Get a single user
    //*********NEED TO CHECK */
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
             .populate({
                path: 'thoughts',
                select: '-__v'
             })   
            
            .select('-__v');

            if (!userData) {
                res.status(404).json({ message: 'No user with that ID found!' });
                return;
            }

            // res.json({
            //     user,
            //     thoughts: await thoughts(req.params.userId),
            //     friends: await friends(req.params.userId),
            //     reactions: await reactions(req.params.userId),
            // });
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Create new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Delete a user and remove their thoughts and reactions
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.id });

            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID!' });
            }
            await Thought.deleteMany({ username: user.username });
            return res.json({ message: "The user and all of their thoughts past, present, and future have been deleted!" });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
},

// Update a single user
async updateUser({ params, body }, res) {
    try {
        const user = await User.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true,
        });
        if (!userData) {
            res.status(404).json({ message: "Nooo that user cannot be found by this ID!" });
            return;
        }
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},

// Add a new friend!
async addNewFriend(req, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.UserId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true}
        );
        if (!user) {
            res.status(404).json({ message: "Cant find that user ID!" });
        }
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},

// Delete your former friend 😫
async deleteOldFriend(req, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.UserId },
            { $pull: { friends: req.params.friendId } },
            { new: true}
        );
        if (!user) {
            res.status(404).json({ message: "Sorry, can't find that user ID!" });
        }
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},

};
