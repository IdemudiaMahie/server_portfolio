var express = require('express');
var router = express.Router();

let usersController = require('../controllers/users');

router.get('/', usersController.usersList);
router.get('/:id', usersController.getByID);
router.post('/', usersController.processAdd);
router.put('/:id',  requireSignin, usersController.processEdit);
router.delete('/:id',  requireSignin, usersController.performDelete);

module.exports = router;