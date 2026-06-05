const express = require('express');
const {
  getUsers,
  createUser,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
} = require('../controllers/userController');

const router = express.Router();

router.route('/').get(getUsers).post(createUser);
router.post('/register', registerUser);
router.route('/:id').put(updateUser).delete(deleteUser);
router.post('/login', loginUser);

module.exports = router;
