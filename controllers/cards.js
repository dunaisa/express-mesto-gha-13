const Card = require('../models/card');
//import { ValidationError, ObjectNotFound, ServerError } from '../Components/HttpError';

//Возвращает все карточки
const getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

//Создает карточку
const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link })
    .then(card => res.send({ data: card }))
    .catch(console.dir)
  // .catch(() => {

  //   if (err.name === 'ValidationError') {
  //     const ValidationError = new ValidationError(`Данные заполнены некорректно. ${err}`)
  //     return res.status(ValidationError.status).send(ValidationError.message)
  //   }
  // });
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
const deleteLikeCard = (req, res) => {
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
  deleteLikeCard
};