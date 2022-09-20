const User = require('../models/user');

//Возвращает всех пользователей
const getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

//Создает пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

//Возвращает пользователя по id
const findUser = (req, res) => {
  if (req.id === req.body._id) {
    User.find({})
      .then(user => res.send({ data: user }))
      .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
  }
};

module.exports = {
  getUsers,
  createUser,
  findUser
}