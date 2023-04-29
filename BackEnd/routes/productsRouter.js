const express = require('express');
const verifyToken = require('../middlewares/auth')
const productsController = require('../controllers/productsController');

const router = express.Router();

router
    .route('/')
    .get(productsController.index)
    .post(verifyToken, productsController.create)

router
    .route('/:id')
    .get(productsController.detail)
    .put(verifyToken, productsController.update)
    .delete(verifyToken, productsController.remove)

module.exports = router;