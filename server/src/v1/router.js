const router = require('express').Router();
const controller = require('./controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router.route('/').all(methodNotAllowed);

module.exports = router;
