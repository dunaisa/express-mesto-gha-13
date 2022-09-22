const Card = require('../models/card');
const { ValidationError } = require('../Components/HttpError');

//Возвращает все карточки
const getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

//Создает карточку
const createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then(card => res.send({ data: card }))
    .catch((errors) => {
      if (errors.name === 'ValidationError') {
        const IncorrectInputValue = new ValidationError('Переданы некорректные данные.')
        return res.status(IncorrectInputValue.status).send({ message: IncorrectInputValue.message })
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

//res.status(500).send({ message: 'Произошла ошибка' })

//Удаление карточки по id
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

//Поставить лайк карточке
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    //добавить _id в массив, если его там нет
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.send({ data: card.likes }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

//Убрать лайк с карточки
const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    // убрать _id из массива
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.send({ data: card.likes }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
};