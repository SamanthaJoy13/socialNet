const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

router.route('/')
        .get(getUsers)
        .post(createUser);

router.route('/:userId')
        .get(getUserById)
        .put(updateUserById)
        .delete(deleteUserById);

router.route('/:userId/friends/:friendId')
        .post(addFriend)
        .delete(deleteFriend);

module.exports = router;