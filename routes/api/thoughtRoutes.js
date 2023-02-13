const router = require('express').Router();
// This code uses destructuring assignment to import functions from a module named ThoughtController.
const {
  getThought,
  getSinglerThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/ThoughtController');

// This code is setting up a route in an Express.js application. The route is being defined as the root path ('/'), and it is using the get and post methods.
router.route('/').get(getThought).post(createThought);

// This code is setting up the '/:thoughtId' path to handle GET, PUT, and DELETE requests, and it is specifying which functions should be executed for each type of request. The thoughtId path parameter is used to identify which thought the request is acting upon.

router.route('/:thoughtId')
  .get(getSinglerThought)
  .put(updateThought)
  .delete(deleteThought);

//This code is setting up the '/:thoughtId/reactions' path to handle POST requests, and it is specifying that the createReaction function should be executed for this type of request. The thoughtId and reactions path parameters are used to identify which thought the reaction is being added to.

router.route('/:thoughtId/reactions')
  .post(createReaction);
  
  router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);



module.exports = router;