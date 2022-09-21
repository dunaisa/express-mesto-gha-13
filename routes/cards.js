const router = require('express').Router();

const { getCards, createCard, deleteCard, likeCard, deleteLikeCard } = require('../controllers/cards.js');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);

router.post('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', deleteLikeCard);

module.exports = router;