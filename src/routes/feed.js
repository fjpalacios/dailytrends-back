const router = require('express').Router();

const FeedController = require('../controllers/feed');
const fc = new FeedController();

router
  .post('/', fc.create)
  .get('/', fc.getAll)
  .get('/:id', fc.getOne)
  .put('/:id', fc.update)
  .delete('/:id', fc.delete);

module.exports = router;
