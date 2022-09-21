const User = require('../models/user');
const { ValidationError } = require('../Components/HttpError');

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
    .catch((errors) => {
      if (errors.name === 'ValidationError') {
        console.dir(errors)
        const IncorrectInputValue = new ValidationError('Переданы некорректные данные.')
        return res.status(IncorrectInputValue.status).send({ message: IncorrectInputValue.message })
      }
    })
  // .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

//Возвращает пользователя по id
const findUser = (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));

};

//Обновляет профиль
const updateUserInfo = (req, res) => {
  User.findByIdAndUpdate(req.params.userId)
    .then(user => res.send({ data: user.name }))
    .then(user => res.send({ data: user.about }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

//Обновляет аватар
const updateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(req.params.userId)
    .then(user => res.send({ data: user.avatar }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = {
  getUsers,
  createUser,
  findUser,
  updateUserInfo,
  updateUserAvatar
};