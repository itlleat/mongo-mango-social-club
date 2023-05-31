const { User, Thought } = require('../models');



module.exports = {
    // Get all Users
    async getAllUsers(req, res) {
        try {
          const user = await User.find()
            .populate({
              path: 'thoughts',
              select: '-__v'
            })
            .select('-__v')
            .sort({ _id: 1 });
          res.json(user);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },

    // Get a single user


    async getUserById(req, res) {
        try {
          const user = await User.findById(req.params.id)
            .populate({
              path: 'thoughts',
              select: '-__v',
            })
            .populate({
              path: 'friends',
              select: '-__v',
            })
            .select('-__v');
      
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          res.json(user);
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Server error' });
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
        if (!user) {
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
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true}
        );
        if (!user) {
            res.status(404).json({ message: "Cant find that user ID!" });
            return;
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
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true}
        );
        if (!user) {
            res.status(404).json({ message: "Sorry, can't find that user ID!" });
            return;
          }
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

};
