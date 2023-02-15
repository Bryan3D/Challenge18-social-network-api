const router = require('express').Router();

//  These functions likely correspond to various operations that can be performed on the "thought" resource in the application.
const {
  getAllThoughts,
  addThought,
  getThoughtById,
  updateThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController');
const { route } = require('./userRoutes');

// The handler function for the route is getAllThoughts, which should be defined elsewhere in the code. When a GET request is made to the root URL, the getAllThoughts function will be called to handle the request.
router.route('/').get(getAllThoughts);

// defining a route in a Node.js server using the Express framework. The route is configured to match any HTTP POST requests to a path that includes a userId parameter.
router.route('/:userId').post(addThought);

// This route is configured to match any HTTP GET or PUT requests to a path that includes a thoughtId parameter.
router.route('/:thoughtId').get(getThoughtById).put(updateThought)

// The route is configured to match any HTTP DELETE requests to a path that includes both a userId and a thoughtId parameter.
router
  .route('/:userId/:thoughtId')
  .delete(removeThought);

// The route is configured to match any HTTP POST requests to a path that includes a thoughtId parameter followed by a /reactions segment.
router
  .route('/:thoughtId/reactions')
  .post(addReaction);

// It builds on the previous snippet, which defined a route for adding reactions to a thought, by adding another route that can be used to remove a reaction from a thought.
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;