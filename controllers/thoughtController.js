const { ObjectID } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thought = await Thought.find()
                .populate({
                    path: 'reactions',
                    select: '-__v'
                })
                .select('-__v')
                .sort({ _id: 1 });
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
            return;
        }
    },
    // Get a specific thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: params.id })
                .populate({
                    path: 'reactions',
                    select: '-__v'
                })
                .select('-__v');

            if (!thought) {
                res.status(404).json({ message: 'No thought with that ID found!' });
                return;
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Create a thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const newThought = await User.findOneAndUpdate(
                { username: req.bod.username },
                { $addToSet: { thoughts: thoughtData._id } },
                { new: true }
            );
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
            return;
        }
    },

    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.id });

            if (!thought) {
                res.status(404).json({ message: 'No thought with that ID' });
                return;
            }

            await Thought.deleteMany({ _id: { $in: thought.users } });
            res.json({ message: 'Thoughts and users deleted!' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Update a thought

    async updateThought({ params, body }, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: params.id },
                body,
                { new: true },
                { runValidators: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'No thought with this id!' });
                return;
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Add a new reaction
    async addReaction({ params, body }, res) {
        try {
            const thought = await thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $push: { reactions: body } },
                { new: true },
                { runValidators: true }
            );
            if (!thought) {
                res.status(404).json({ message: 'Thought not found by ID!' });
                return;
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Delete a reaction
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            )
            
            if (!thought) {
                res.status(404).json({ message: 'Thought withat ID not found!' });
                return;
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

};