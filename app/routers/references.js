var express = require('express');
var router = express.Router();

let referencesController = require('../controllers/references');

router.get('/', referencesController.referencesList);
router.get('/:id', referencesController.getByID);
router.post('/', requireSignin, referencesController.processAdd);
router.put('/:id', requireSignin, referencesController.processEdit);
router.delete('/:id', requireSignin, referencesController.performDelete);

module.exports = router;