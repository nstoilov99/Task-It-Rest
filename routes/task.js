const controllers = require('../controllers');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/', controllers.task.get);

router.post('/', auth(), controllers.task.post);

router.put('/:id', auth(), controllers.task.put);

router.delete('/:id', auth(), controllers.task.delete);

module.exports = router;