const { Thought, User } = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a specific thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought witht hat ID found!' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create a thought
    async createThought(req, res) {
        try {
          const thought = await Thought.create(req.body);
          res.json(thought);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
    },

    // Delete a thought
    async deleteThought(req, res) {
        try {
          const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
    
          if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
          }
    
          await Thought.deleteMany({ _id: { $in: thought.users } });
          res.json({ message: 'Thoughts and users deleted!' });
        } catch (err) {
          res.status(500).json(err);
        }
      },

      // Update a thought

      async updateThought(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            res.status(404).json({ message: 'No thought with this id!' });
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    };