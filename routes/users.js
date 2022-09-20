const router = require('express').Router();

const { getUsers, createUser } = require('../controllers/users');

router.get('/', getUsers);
router.post('/', createUser);

module.exports = router;

// //Возвращает пользователя по id
// router.get('/users/:userId', (req, res) => {
//   User.find({})
//     .then(users => res.send({ data: users }))
//     .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
// });