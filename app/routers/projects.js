var express = require('express');
var router = express.Router();

let projectsController = require('../controllers/projects');

router.get('/', projectsController.projectsList);
router.get('/:id', projectsController.getByID);
router.post('/', requireSignin, projectsController.processAdd);
router.put('/:id', requireSignin, projectsController.processEdit);
router.delete('/:id', requireSignin, projectsController.performDelete);

module.exports = router;