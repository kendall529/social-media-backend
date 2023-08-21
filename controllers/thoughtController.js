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
            const { _id: thoughtId} = await Thought.create(req.body)

            const updatedUserArray = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thoughtId } },
                { new: true }
            );

            if (!updatedUserArray) {
                return res.status(404).json({ message: "Thought created but no user found with this ID." });
              }
          
            res.json({ message: "Thought successfully created!" });
            
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update a thought
    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                req.body,
                { 
                    new: true,
                    runValidators: true
                },
            );

            if(!updatedThought) {
                return res.status(404).json({ mssg: 'No thought with this ID.'})
            }

            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thoughtToDelete = await Thought.findOneAndDelete({ _id: req.params.id });

            if(!thoughtToDelete) {
                return res.status(404).json({ mssg: 'No thought with this ID.'})
            }

            // remove thoughtID from user's thoughts field
            const updatedUserArray = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                //$pull removes from an existing value that matches a specified condition.
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );

            if (!updatedUserArray) {
                return res.status(404).json({ mssg: "Thought deleted but no user found with this ID." });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Add reaction
    async addReaction(req, res) {
        try {
            const addedReaction = await Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $addToSet: { reactions: req.body} },
                { 
                    new: true,
                    runValidators: true,
                }
            )
            if(!addedReaction) {
               return res.status(404).json({ mssg: 'No thought with this ID.'})
            }

            res.json(addedReaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete reaction
    async deleteReaction(req, res) {
        try {
            const updatedThoughtArray = await Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                //$pull removes from an existing value that matches a specified condition.
                { $pull: { reactions: { reactionId: req.params.reactionId} } },
                { new: true }
            )
            
            res.json(updatedThoughtArray);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}