const router = require('express').Router();
// This code uses destructuring assignment to import functions from a module named UserController.
const {
  getUser,
  getSinglerUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

// // This code is setting up a route in an Express.js application. The route is being defined as the root path ('/'), and it is using the get and post methods.

router.route('/').get(getUser).post(createUser);

//This code is setting up the '/:userId' path to handle GET, PUT, and DELETE requests, and it is specifying which functions should be executed for each type of request. The userId path parameter is used to identify which thought the request is acting upon.

router.route('/:userId')
  .get(getSinglerUser)
  .put(updateUser)
  .delete(deleteUser);

  //This code is setting up another route in an Express.js application. The route is being defined as '/:userId/friends/:friendId', which means that it includes two path parameters: userId and friendId.

router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);

module.exports = router;