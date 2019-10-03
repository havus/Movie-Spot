const router = require('express').Router();
const tvSeriesController = require('../controllers/tvSeries');
const authentication = require('../middleware/authentication');
const upload = require('../middleware/imgbb');

router.post('/', upload, tvSeriesController.add,);
router.get('/', tvSeriesController.findAll);
router.get('/:id', tvSeriesController.findOne);
router.put('/:id', tvSeriesController.updateOne);
router.delete('/:id', tvSeriesController.deleteOne);

module.exports = router;