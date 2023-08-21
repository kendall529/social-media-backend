const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find()
                .populate({
                    path: 'friends',
                    select: '-__v',
                })
                .select('-__v')
                .sort({ _id: -1 })

            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .populate({
                    path: 'thoughts',
                    select: '-__v',
                })
                .populate({
                    path: 'friends',
                    select: '-__v',
                })
                .select('-__v');

            if(!user) {
                return res.status(404).json({ mssg: 'No course with this ID.'});
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create user
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update a user
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                req.body,
                { 
                    new: true, 
                    runValidators: true,
                }
            );
    
            if (!updatedUser) {
                return res.status(404).json({ message: "No user found with this ID." });
            }
    
            res.json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a user
    async deleteUser(req, res) {
        try {
            const userToDelete = await User.findOneAndDelete({ _id: req.params.userId });
    
            if (!userToDelete) {
                return res.status(404).json({ message: "No user with this ID." });
            }
    
            //Get ids of user's thoughts and delete them all using the $in operator
            await Thought.deleteMany({ _id: { $in: userToDelete.thoughts } });
    
            res.json({ message: "The user and thoughts have been deleted." });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Add friend
    async addFriend(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { 
                    new: true, 
                    runValidators: true 
                }
            );
    
            if (!updatedUser) {
                return res.status(404).json({ message: "No user with this ID." });
            }
    
            res.json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Remove friend
    async removeFriend(req, res) {
        try {
            const updatedUserArray = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
    
            if (!updatedUserArray) {
                return res.status(404).json({ message: "No user with this id!" });
            }
    
            res.json(updatedUserArray);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};