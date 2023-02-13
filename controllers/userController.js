
// This line of code is requiring the ObjectId type from the mongoose.Types module.
const { ObjectId } = require('mongoose').Types;

// This line of code is destructuring the User and Thought models from the ../models module.In this line, the User and Thought variables are being set to the exported User and Thought models from the ../models module. This is a way of importing and using the models defined in the models module in the current file.

const { User, Thought } = require("../models");

module.export = {
  // The getUser function is a route handler that retrieves all the users from the User model and sends the response in JSON format.
  getUser(req, res) {
    User.find({})
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err))
  },
  // The getSingleUser function is used to retrieve a single user based on the userId passed in the request parameters. The user is retrieved using the findOne method of the User model, which returns the first document that matches the given filter.

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate("thoughts")
      .populate("friends")
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User find with that ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // The function createUser creates a new user by using the create method of the User model. This method takes the request body as input and creates a new user with the data provided in the request body. If the user is created successfully, it returns the created user in the response. In case of any error during the creation process, it logs the error to the console and returns a 500 status code with the error message in the response.

  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
  },
  
  
  // This function updates a user based on the user ID specified in the request parameters.We first find the user in the database using the user ID from the request parameters.The findOneAndUpdate() method is used to update the user document in the database.

  updateUser(req, res) {
    
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User find with this ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // This function deletes a user from the database based on the user ID specified in the request parameters.It first searches for a user with the specified ID using findOneAndDelete.If the user is not found, it returns a 404 status code and a message indicating that no user was found with that ID. If the user is found, it deletes the user and all of the thoughts associated with that user by calling Thought.deleteMany. The final result is a JSON message indicating that the user and thoughts have been deleted. In case of any error during the deletion process, it returns a 500 status code and the error message.

  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User find with this ID!" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: "User and Thought deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  //This code implements a function "addFriend" for adding a friend to an existing user in a database. It performs a findOneAndUpdate operation on the User collection using the userId passed in the request parameters. The $addToSet operator is used to add the friendId from the request parameters to the "friends" array field of the user document. The runValidators option is set to true to run the validators defined in the User model during the update operation. The new option is set to true to return the updated document after the update operation.
  
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User find with this ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //This code is for removing a friend from a user's friend list. The friend's ID is passed in the request parameters and the code uses the $pull operator to remove the friend from the friends array field of the user document. The updated user document is then returned in the response, or a 404 error is returned if no user was found with the given ID. In case of any other errors, a 500 error is returned.
  
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then(
        (user) =>
          !user
            ? res.status(404).json({ message: "No User find with this ID!" })
            : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};




