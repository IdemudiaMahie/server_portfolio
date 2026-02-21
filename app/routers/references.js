var express = require('express');
var router = express.Router();

let referencesController = require('../controllers/references');

router.get('/', referencesController.referencesList);
router.get('/:id', referencesController.getByID);
router.post('/', referencesController.processAdd);
router.put('/:id', referencesController.processEdit);
router.delete('/:id', referencesController.performDelete);

module.exports = router;