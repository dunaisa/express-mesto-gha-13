const User = require('../models/user');
const { ValidationError, ObjectNotFound } = require('../Components/HttpError');

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
        const IncorrectInputValue = new ValidationError('Переданы некорректные данные.')
        return res.status(IncorrectInputValue.status).send({ message: IncorrectInputValue.message })
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

//Возвращает пользователя по id
const findUser = (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.send({ data: user }))
    .catch((errors) => {
      if (req.params.userId) {
        console.log(req.params.userId)
        const UserNotFound = new ObjectNotFound('Пользователь не найден.')
        return res.status(UserNotFound.status).send({ message: UserNotFound.message })
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

//Обновляет профиль
const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(req.params.userId, { name, about }, { new: true, runValidators: true })
    .then(user => res.send({ data: user }))
    .catch((errors) => {
      console.dir(errors)
      if (errors.name === 'ObjectIdIsNotFound' && errors.errorCode === 404) {
        const UserNotFound = new ObjectNotFound('Пользователь не найден.')
        return res.status(UserNotFound.status).send({ message: UserNotFound.message })

      } else if (errors.name === 'ValidationError') {
        const IncorrectInputValue = new ValidationError('Переданы некорректные данные.')
        return res.status(IncorrectInputValue.status).send({ message: IncorrectInputValue.message })

      } else {
        return res.status(500).send({ message: 'Произошла ошибка' });
      }
    })
};

// .catch ((errors) => {
//   console.dir(errors)
//   if (errors.name === 'ValidationError') {
//     //400
//     const IncorrectInputValue = new ValidationError('Переданы некорректные данные.')
//     return res.status(IncorrectInputValue.status).send({ message: IncorrectInputValue.message })
//   } else if (errors.name === 'Cast to ObjectId failed') {
//     //404
//     const UserNotFound = new ObjectNotFound('Пользователь не найден.')
//     return res.status(UserNotFound.status).send({ message: UserNotFound.message })
//   }
// })
//     .catch (() => res.status(500).send({ message: 'Произошла ошибка' }));

//Обновляет аватар
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.params.userId, { avatar }, { new: true, runValidators: true })
    .then(user => res.send({ data: user }))
    .catch((errors) => {
      if (!avatar) {
        const IncorrectInputValue = new ValidationError('Переданы некорректные данные.');
        return res.status(IncorrectInputValue.status).send({ message: IncorrectInputValue.message })
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = {
  getUsers,
  createUser,
  findUser,
  updateUserInfo,
  updateUserAvatar
};