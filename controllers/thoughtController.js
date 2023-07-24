const User = require('../models/user');
const Thought = require('../models/thought');

const thoughtController = {

    async getThoughts(req, res) {

      try {

        const thoughts = await Thought.find();
        res.json(thoughts);

      } catch (err) {

        res.status(500).json(err);
      }

    },

    async getThoughtById(req, res) {

      try {

        const { thoughtId } = req.params;
        const thought = await Thought.findById(thoughtId);

        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }

        res.json(thought);

      } catch (err) {

        res.status(500).json(err);

      }

    },
  
    async createThought(req, res) {

      try {

        const { thoughtText, username, userId } = req.body;
        const newThought = await Thought.create({ thoughtText, username });
        const user = await User.findByIdAndUpdate(
          userId,
          { $push: { thoughts: newThought._id } },
          { new: true }
        );
  
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        res.json(newThought);

      } catch (err) {

        res.status(500).json(err);

      }

    },
  
    async updateThoughtById(req, res) {

      try {

        const { thoughtId } = req.params;
        const { thoughtText } = req.body;
        const updatedThought = await Thought.findByIdAndUpdate(
          thoughtId,
          { thoughtText },
          { new: true }
        );

        if (!updatedThought) {
          return res.status(404).json({ message: 'Thought not found' });
        }

        res.json(updatedThought);

      } catch (err) {

        res.status(500).json(err);

      }

    },
  
    async deleteThoughtById(req, res) {

      try {

        const { thoughtId } = req.params;
        const deletedThought = await Thought.findByIdAndRemove(thoughtId);

        if (!deletedThought) {
          return res.status(404).json({ message: 'Thought not found' });
        }

        res.json(deletedThought);

      } catch (err) {

        res.status(500).json(err);

      }

    },
  
    async createReaction(req, res) {

      try {

        const { thoughtId } = req.params;
        const { reactionBody, username } = req.body;
        const updatedThought = await Thought.findByIdAndUpdate(
          thoughtId,
          { $push: { reactions: { reactionBody, username } } },
          { new: true }
        );
  
        if (!updatedThought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
  
        res.json(updatedThought);

      } catch (err) {

        res.status(500).json(err);

      }

    },
  
    async deleteReaction(req, res) {

      try {
        const { thoughtId, reactionId } = req.params;
        const updatedThought = await Thought.findByIdAndUpdate(
          thoughtId,
          { $pull: { reactions: { _id: reactionId } } },
          { new: true }
        );
  
        if (!updatedThought) {
          return res.status(404).json({ message: 'Thought or Reaction not found' });
        }
  
        res.json(updatedThought);

      } catch (err) {

        res.status(500).json(err);

      }

    }
    
  };
  
  module.exports = thoughtController;  