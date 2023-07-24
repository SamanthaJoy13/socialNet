const User = require('../models/user');
const Thought = require('../models/thought');

const userController = {

  async getUsers(req, res) {

    try {

      const users = await User.find().populate('thoughts').populate('friends');
      res.json(users);

    } catch (err) {

      res.status(500).json(err);

    }

  },

  async getUserById(req, res) {

    try {

      const { userId } = req.params;
      const user = await User.findById(userId).populate('thoughts').populate('friends');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);

    } catch (err) {

      res.status(500).json(err);
    }

  },

  async createUser(req, res) {

    try {

      const { username, email } = req.body;
      const newUser = await User.create({ username, email });
      res.json(newUser);

    } catch (err) {

      res.status(500).json(err);

    }

  },

  async updateUserById(req, res) {

    try {

      const { userId } = req.params;
      const { username, email } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { username, email },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(updatedUser);

    } catch (err) {

      res.status(500).json(err);

    }

  },

  async deleteUserById(req, res) {

    try {

      const { userId } = req.params;
      const deletedUser = await User.findByIdAndRemove(userId);

      if (deletedUser) {
        await Thought.deleteMany({ username: deletedUser.username });
      }

      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(deletedUser);

    } catch (err) {

      res.status(500).json(err);

    }

  },


  async addFriend(req, res) {

    try {

      const { userId, friendId } = req.params;
      const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { friends: friendId } }, // Use $addToSet to avoid duplicate friends
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);

    } catch (err) {

      res.status(500).json(err);

    }

  },


  async deleteFriend(req, res) {

    try {

      const { userId, friendId } = req.params;
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } }, // Use $pull to remove a friend from the array
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);

    } catch (err) {

      res.status(500).json(err);

    }

  }
  
};

module.exports = userController;