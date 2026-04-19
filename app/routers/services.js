var express = require('express');
var router = express.Router();

let servicesController = require('../controllers/services');

router.get('/', servicesController.servicesList);
router.get('/:id', servicesController.getByID);
router.post('/', requireSignin, servicesController.processAdd);
router.put('/:id', requireSignin, servicesController.processEdit);
router.delete('/:id', requireSignin, servicesController.performDelete);

module.exports = router;