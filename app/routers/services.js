var express = require('express');
var router = express.Router();

let servicesController = require('../controllers/services');

router.get('/', servicesController.servicesList);
router.get('/:id', servicesController.getByID);
router.post('/', servicesController.processAdd);
router.put('/:id', servicesController.processEdit);
router.delete('/:id', servicesController.performDelete);

module.exports = router;