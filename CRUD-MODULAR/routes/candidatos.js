const express = require('express');
const router = express.Router();
const { criarCandidato } = require('../controllers/candidatosController');

router.post('/', criarCandidato);

module.exports = router;
