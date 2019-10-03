const router = require('express').Router();
const movieController = require('../controllers/movie');

router.post('/', movieController.add);
router.get('/', movieController.findAll);
router.get('/:id', movieController.findOne);
router.put('/:id', movieController.updateOne);
router.delete('/:id', movieController.deleteOne);

module.exports = router;