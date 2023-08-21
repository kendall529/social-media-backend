const { Thought, User } = require('../models');

module.exports = {
    // Get all courses
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // Get a single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId})
            .select('-__v');

            if(!thought) {
                return res.status(404).json({ mssg: 'No thought with that ID'});
            }

            res.json(thought);
        } catch (error) {
            res.status(500).json(err);
        }
    },

    // Create a thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body)
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update a thought
    async updateThought(req, res) {
        try {
            User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { thoughts: _id }},
                { new: true }
            )
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // Delete a thought
    async deleteThought(req, res) {
        try {
            
        } catch (err) {
            res.status(500).json(err);
        }
    }
}