
const { User, Thought } = require('../models');

module.exports = {

  // "Get all thoughts" This code defines a function named getThought which is likely to be used as a route handler for an HTTP GET request in a Node.js application.

  getThought(rep, res) {
    Thought.find({})
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  // function named getSingleThought which is likely to be used as a route handler for an HTTP GET request in a Node.js application to retrieve a single thought document based on its ID.

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtID })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No Thought find with this ID!" })
          : res.json(thought)

      )
      .catch((err) => res.status(500).json(err));
  },

  //This function creates a new "Thought" document using the data provided in the request body, then it finds the user associated with the thought and updates the user's "thoughts" array to include the newly created thought.

  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _Id } },
          { new: true }


        );

      })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No Thought find with this ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // This function updates an existing "Thought" document using the data provided in the request body.
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, New: true }
    )

      .then((user) =>
        !user
          ? res.status(404).json({ message: "No Thought find with this ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },


  //This code is a function that deletes a thought and updates the associated user in a MongoDB database using Mongoose.

  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ massage: "No thought find with this ID!" })
          : User.findOneAndUpdate(
            { thought: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          )
      )
      .then((user) =>
        !user
          ? res.status(404).json({ massage: 'Thought deleted, but no user found' })
          : res.status({ message: 'Thought succesfully delete' })
      )
      .catch((err) => res.status(500).json(err));
  },

  // This code is a function that creates a reaction for a thought in a MongoDB database using Mongoose.

  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought firend with ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
        
  },

  // This code is a function that deletes a reaction for a thought in a MongoDB database using Mongoose.

  deleteReaction(req, res) {
    Thought.findOneAndDelete(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought find with this ID! " })
          : res.json(thought)
      )

      .catch((err) => res.status(500).json(err))
  },

};
