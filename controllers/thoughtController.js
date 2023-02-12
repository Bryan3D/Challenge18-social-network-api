
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
  
  //

  createThought(req, res) {
    Thought.create(req.body)
      .then({ _id }) => {
      return User.Model.findOneAndUpdate({
          find-field: filter,
      }, {
          update-field: filter,
      }, (err, doc) => {
          if (err) {
              console.log(`Error: ` + err)
          } else {
              
          }
      });
      }
  }

}


