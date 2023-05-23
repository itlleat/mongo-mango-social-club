const router = require('express').Router();
const {
 getAllUsers,
 getUserById,
 createUser,
 updateUser,
 deleteUser,
 addNewFriend,
 deleteOldFriend,
} = require('../../controllers/userController');

// Get all Users
router.get('/').get(getAllUsers).post(createUser);
// GET a single user by its _id 
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);
// GET a single user by its _id and populated thought and friend data
router.route('/:userId/thoughts/friends').get(getUserById);
// Delete user thoughts when user is deleted
router.route('/:userId/thoughts/:thoughtId').delete(deleteUser);
// Add and delete friends
router.route('/:userId/friends/:friendId').post(addNewFriend).delete(deleteOldFriend);

module.exports = router;