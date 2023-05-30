const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');
// GET to get all thoughts
router.route('/').get(getThoughts).post(createThought);
// GET to get a single thought by its _id
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);
// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
router.route('/:thoughtId/reactions').post(addReaction);
// PUT to update a thought by its _id
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;