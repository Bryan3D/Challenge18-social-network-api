const router = require('express').Router();

// These functions likely correspond to various operations that can be performed on the "user" resource in the application. this code snippet shows how the logic for handling requests is separated from the code that defines the routes themselves. 

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

// the "user" resource in a Node.js server using the Express framework. The route is configured to match HTTP requests to the root path / of the resource.


// This code snippet defines a route for the "user" resource in a Node.js server using the Express framework. The route is configured to match HTTP requests to a path that includes an id parameter.
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser)

// The route is configured to match HTTP requests to a path that includes an id parameter for the user whose friends list will be updated and a friendId parameter for the friend being added or removed.
router
  .route('/:id/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

// The route is configured to match HTTP requests to the root path / of the resource.This route handles two different HTTP methods.

router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

module.exports = router;