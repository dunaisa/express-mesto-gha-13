const router = require('express').Router();

const { getUsers, createUser, findUser } = require('../controllers/users.js');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:userId', findUser);

module.exports = router;