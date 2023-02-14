const router = require('express').Router();
const {
  getAllThoughts,
  addThought,
  getThoughtById,
  updateThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');
const { route } = require('./user-routes');

// The handler function for the route is getAllThoughts, which should be defined elsewhere in the code. When a GET request is made to the root URL, the getAllThoughts function will be called to handle the request.
router.route('/').get(getAllThoughts);

// /api/thoughts/<userId>
router.route('/:userId').post(addThought);

// /api/thoughts/<thoughtId>
router.route('/:thoughtId').get(getThoughtById).put(updateThought)

// /api/thoughts/<userId>/<thoughtId>
router
  .route('/:userId/:thoughtId')
  .delete(removeThought);

// /api/thoughts/<thoughtId>/reactions
router
  .route('/:thoughtId/reactions')
  .post(addReaction);

// /api/<thoughtId>/reactions/<reactionId>
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;